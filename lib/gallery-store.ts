import { createHash, randomUUID } from 'node:crypto'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
  S3ServiceException,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'
import {
  ALLOWED_UPLOAD_TYPES,
  MAX_UPLOAD_BYTES,
  VARIANT_WIDTHS,
  type GalleryPhoto,
  type Photo,
} from './gallery'
import { bucket, publicUrl, r2 } from './r2'

const MANIFEST_KEY = 'gallery/manifest.json'
const MAX_MANIFEST_ATTEMPTS = 5
const UPLOAD_URL_TTL_SECONDS = 600
const ALLOWED_FORMATS = new Set(['jpeg', 'png', 'webp'])
const UPLOAD_KEY_PATTERN = /^uploads\/[0-9a-f-]{36}$/

export class GalleryInputError extends Error {}

type Manifest = { photos: Photo[] }

const variantKey = (id: string, width: number) => `photos/${id}/${width}.webp`

export const toGalleryPhoto = (photo: Photo): GalleryPhoto => ({
  ...photo,
  src: publicUrl(`photos/${photo.id}`),
})

async function readManifest(): Promise<{ manifest: Manifest; etag: string | null }> {
  try {
    const res = await r2().send(new GetObjectCommand({ Bucket: bucket(), Key: MANIFEST_KEY }))
    const manifest: Manifest = JSON.parse(await res.Body!.transformToString())
    return { manifest, etag: res.ETag ?? null }
  } catch (e) {
    if (e instanceof NoSuchKey) return { manifest: { photos: [] }, etag: null }
    throw e
  }
}

export async function readPhotos(): Promise<Photo[]> {
  return (await readManifest()).manifest.photos
}

// Optimistic concurrency: conditional write on the ETag we read, retry if another writer won
async function updateManifest(mutate: (photos: Photo[]) => Photo[]) {
  for (let attempt = 0; attempt < MAX_MANIFEST_ATTEMPTS; attempt++) {
    const { manifest, etag } = await readManifest()
    const photos = mutate(manifest.photos)
    if (photos === manifest.photos) return

    try {
      await r2().send(
        new PutObjectCommand({
          Bucket: bucket(),
          Key: MANIFEST_KEY,
          Body: JSON.stringify({ photos } satisfies Manifest),
          ContentType: 'application/json',
          CacheControl: 'no-cache',
          ...(etag ? { IfMatch: etag } : { IfNoneMatch: '*' }),
        }),
      )
      return
    } catch (e) {
      const status = e instanceof S3ServiceException ? e.$metadata.httpStatusCode : undefined
      if (status !== 412 && status !== 409) throw e
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 * 2 ** attempt))
    }
  }
  throw new Error('Gallery manifest update failed after repeated write conflicts')
}

export async function addPhotos(newPhotos: Photo[]) {
  await updateManifest((photos) => {
    const seen = new Set(photos.map((p) => p.id))
    const fresh = newPhotos.filter((p) => !seen.has(p.id) && seen.add(p.id))
    return fresh.length ? [...fresh, ...photos] : photos
  })
}

export type ProcessResult = { status: 'added' | 'duplicate'; photo: Photo }

/** Resizes, strips metadata and uploads variants. Does not touch the manifest. */
export async function processPhoto(input: Uint8Array, existing: Photo[]): Promise<ProcessResult> {
  // Content-addressed IDs make re-uploads idempotent
  const id = createHash('sha256').update(input).digest('hex').slice(0, 16)
  const duplicate = existing.find((p) => p.id === id)
  if (duplicate) return { status: 'duplicate', photo: duplicate }

  // rotate() applies EXIF orientation; sharp drops all metadata (incl. GPS) from output by default
  const source = sharp(input).rotate()
  let format: string | undefined
  try {
    format = (await source.metadata()).format
  } catch {
    throw new GalleryInputError('File is not a readable image')
  }
  if (!format || !ALLOWED_FORMATS.has(format)) {
    throw new GalleryInputError(`Unsupported image format: ${format ?? 'unknown'}`)
  }

  const variants = await Promise.all(
    VARIANT_WIDTHS.map(async (width) => {
      const { data, info } = await source
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer({ resolveWithObject: true })
      await r2().send(
        new PutObjectCommand({
          Bucket: bucket(),
          Key: variantKey(id, width),
          Body: data,
          ContentType: 'image/webp',
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      )
      return info
    }),
  )
  const largest = variants[variants.length - 1]
  const blur = await source.clone().resize(16).webp({ quality: 40 }).toBuffer()

  return {
    status: 'added',
    photo: {
      id,
      width: largest.width,
      height: largest.height,
      blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
      uploadedAt: new Date().toISOString(),
    },
  }
}

export async function createUploadUrl(contentType: string, size: number) {
  if (!ALLOWED_UPLOAD_TYPES.includes(contentType)) throw new GalleryInputError('Unsupported file type')
  if (!Number.isInteger(size) || size <= 0 || size > MAX_UPLOAD_BYTES) {
    throw new GalleryInputError('File is empty or too large')
  }

  const key = `uploads/${randomUUID()}`
  const url = await getSignedUrl(
    r2(),
    new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: contentType, ContentLength: size }),
    { expiresIn: UPLOAD_URL_TTL_SECONDS },
  )
  return { key, url }
}

/** Processes a browser upload from the staging prefix, then deletes the original. */
export async function ingestUpload(key: string): Promise<ProcessResult> {
  if (!UPLOAD_KEY_PATTERN.test(key)) throw new GalleryInputError('Invalid upload key')

  try {
    const res = await r2().send(new GetObjectCommand({ Bucket: bucket(), Key: key }))
    if ((res.ContentLength ?? 0) > MAX_UPLOAD_BYTES) throw new GalleryInputError('File too large')
    const bytes = await res.Body!.transformToByteArray()

    const result = await processPhoto(bytes, await readPhotos())
    if (result.status === 'added') await addPhotos([result.photo])
    return result
  } catch (e) {
    if (e instanceof NoSuchKey) throw new GalleryInputError('Upload not found')
    throw e
  } finally {
    // Originals still contain EXIF/GPS data, so never leave them in the public bucket
    await r2()
      .send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }))
      .catch(() => {})
  }
}

export async function deletePhoto(id: string) {
  await updateManifest((photos) => {
    const remaining = photos.filter((p) => p.id !== id)
    return remaining.length === photos.length ? photos : remaining
  })
  await Promise.all(
    VARIANT_WIDTHS.map((w) =>
      r2().send(new DeleteObjectCommand({ Bucket: bucket(), Key: variantKey(id, w) })),
    ),
  )
}
