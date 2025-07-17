/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ludogift/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/ludogift' : ''
}

module.exports = nextConfig 