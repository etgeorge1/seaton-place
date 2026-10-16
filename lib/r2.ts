import { S3Client } from '@aws-sdk/client-s3'

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

let client: S3Client | null = null

export function r2() {
  client ??= new S3Client({
    region: 'auto',
    endpoint: `https://${requireEnv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
    },
    // R2 doesn't support the SDK's default (since v3.729) request checksums
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
  })
  return client
}

export const bucket = () => requireEnv('R2_BUCKET')

export const publicUrl = (key: string) => `${requireEnv('R2_PUBLIC_URL').replace(/\/+$/, '')}/${key}`
