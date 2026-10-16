'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES } from '../lib/gallery'

const CONCURRENCY = 3

type Status = 'queued' | 'uploading' | 'processing' | 'added' | 'duplicate' | 'error'

type Item = {
  name: string
  status: Status
  progress: number
  error?: string
}

const STATUS_LABEL: Record<Status, string> = {
  queued: 'Queued',
  uploading: 'Uploading',
  processing: 'Processing',
  added: 'Added',
  duplicate: 'Already in gallery',
  error: 'Failed',
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`)
  return data
}

// XHR instead of fetch because fetch has no upload progress events
function putWithProgress(url: string, file: File, onProgress: (fraction: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total)
    xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(`Storage upload failed (${xhr.status})`)))
    xhr.onerror = () => reject(new Error('Storage upload failed (network or CORS)'))
    xhr.send(file)
  })
}

export default function GalleryUploader() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [busy, setBusy] = useState(false)
  const [dragging, setDragging] = useState(false)

  const update = (index: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)))

  async function uploadOne(file: File, index: number) {
    try {
      update(index, { status: 'uploading' })
      const { key, url } = await postJson('/api/gallery/uploads', { contentType: file.type, size: file.size })
      await putWithProgress(url, file, (progress) => update(index, { progress }))
      update(index, { status: 'processing', progress: 1 })
      const result = await postJson('/api/gallery/photos', { key })
      update(index, { status: result.status })
    } catch (e) {
      update(index, { status: 'error', error: e instanceof Error ? e.message : 'Upload failed' })
    }
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length || busy) return
    const files = Array.from(fileList)
    const offset = items.length
    setItems((prev) => [
      ...prev,
      ...files.map((file): Item => {
        if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) return { name: file.name, status: 'error', progress: 0, error: 'Use JPG, PNG or WebP' }
        if (file.size > MAX_UPLOAD_BYTES) return { name: file.name, status: 'error', progress: 0, error: 'File is over 50 MB' }
        return { name: file.name, status: 'queued', progress: 0 }
      }),
    ])

    const queue = files
      .map((file, i) => ({ file, index: offset + i }))
      .filter(({ file }) => ALLOWED_UPLOAD_TYPES.includes(file.type) && file.size <= MAX_UPLOAD_BYTES)

    setBusy(true)
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        for (let job = queue.shift(); job; job = queue.shift()) await uploadOne(job.file, job.index)
      }),
    )
    setBusy(false)
    router.refresh()
  }

  return (
    <section>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-16 text-center transition-colors ${
          dragging ? 'border-orange-accent-500 bg-soft-blush-100' : 'border-pink-orchid-300 hover:border-orange-accent-500'
        } ${busy ? 'pointer-events-none opacity-60' : ''}`}
      >
        <span className="font-mono text-2xl tracking-wider">{busy ? 'UPLOADING…' : 'DROP PHOTOS OR CLICK TO SELECT'}</span>
        <span className="mt-2 text-sm text-gray-500">JPG, PNG or WebP, up to 50 MB each</span>
        <input
          type="file"
          multiple
          accept={ALLOWED_UPLOAD_TYPES.join(',')}
          disabled={busy}
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
          className="sr-only"
        />
      </label>

      {items.length > 0 && (
        <ul className="mt-6 space-y-2" aria-live="polite">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-sm">
              <span className="w-1/3 truncate">{item.name}</span>
              <div className="h-2 flex-1 bg-soft-blush-100">
                <div
                  className={`h-full transition-all ${item.status === 'error' ? 'bg-red-500' : 'bg-orange-accent-500'}`}
                  style={{ width: `${item.status === 'error' ? 100 : Math.round(item.progress * 100)}%` }}
                />
              </div>
              <span className={`w-48 text-right ${item.status === 'error' ? 'text-red-500' : 'text-gray-600'}`}>
                {item.error ?? STATUS_LABEL[item.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
