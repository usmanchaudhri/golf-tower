import fs from 'fs'
import path from 'path'

import type { NextConfig } from 'next'

const monorepoRoot = path.join(__dirname, '../..')
const isMonorepo = fs.existsSync(path.join(monorepoRoot, 'yarn.lock'))

const nextConfig: NextConfig = {
    reactStrictMode: true,
    ...(isMonorepo ? { outputFileTracingRoot: monorepoRoot } : {}),
}

export default nextConfig
