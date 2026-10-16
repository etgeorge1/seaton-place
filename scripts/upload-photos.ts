import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { addPhotos, processPhoto, readPhotos } from '../lib/gallery-store'
import type { Photo } from '../lib/gallery'

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const CONCURRENCY = 4

async function main() {
  const dir = process.argv[2]
  if (!dir) {
    console.error('Usage: pnpm gallery:upload <folder>')
    process.exit(1)
  }

  const files = (await readdir(dir)).filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase())).sort()
  const existing = await readPhotos()
  const added: (Photo | null)[] = new Array(files.length).fill(null)
  let duplicates = 0
  let failed = 0
  let next = 0

  async function worker() {
    while (next < files.length) {
      const i = next++
      try {
        const result = await processPhoto(await readFile(path.join(dir, files[i])), existing)
        if (result.status === 'added') added[i] = result.photo
        else duplicates++
        console.log(`${result.status.padEnd(10)} ${files[i]}`)
      } catch (e) {
        failed++
        console.error(`failed     ${files[i]}: ${e instanceof Error ? e.message : e}`)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  // Single manifest write at the end keeps gallery order matching filename order
  const newPhotos = added.filter((p): p is Photo => p !== null)
  if (newPhotos.length) await addPhotos(newPhotos)

  console.log(`\n${newPhotos.length} added, ${duplicates} already in gallery, ${failed} failed`)
  console.log('The live site picks up changes within an hour (or immediately on the next admin upload/delete).')
  if (failed) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
