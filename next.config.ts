import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '',
  images: {
    domains: [
      'raw.githubusercontent.com',
      'codesandtags.io',
      'www.codesandtags.io',
      'codesandtags.github.io'
    ],
  },
  async rewrites() {
    return [
      {
        // Cuando alguien entre a /blog...
        source: '/blog',
        // Vercel irá a buscar el contenido a GitHub...
        destination: 'https://codesandtags.github.io/blog/index.html',
      },
      {
        // Para que carguen los estilos y JS del blog
        source: '/blog/:path*',
        destination: 'https://codesandtags.github.io/blog/:path*',
      },
      // Repite esto para tus otros proyectos "legacy"
      {
        source: '/dark-mode-extension/:path*',
        destination: 'https://codesandtags.github.io/dark-mode-extension/:path*',
      },
    ];
  },
}

export default nextConfig
