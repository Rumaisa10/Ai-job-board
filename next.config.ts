import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],  // ← moved from experimental
  output: 'standalone'
}

export default nextConfig