import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Используем относительные пути для деплоя на GitHub Pages
  basePath: '/rityak',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
