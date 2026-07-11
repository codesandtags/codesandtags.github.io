import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

// Turbopack (Next.js 16 default bundler) requires plugin options to be
// JSON-serialisable — it cannot receive imported JavaScript functions because
// it operates in a Rust context during the build phase.
//
// The fix is to pass plugin identifiers as strings; @next/mdx resolves and
// loads them inside the environment where they can be executed.
//
// rehype-pretty-code is intentionally omitted: it relies on the Shiki
// bundler which creates non-serialisable objects even when loaded by string.
// Syntax highlighting will be added once Turbopack ships full ESM plugin
// support, or via the Webpack bundler fallback if needed.
// Track: https://github.com/vercel/next.js/issues/64525

const nextConfig: NextConfig = {
  basePath: '',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'codesandtags.io' },
      { protocol: 'https', hostname: 'www.codesandtags.io' },
      { protocol: 'https', hostname: 'codesandtags.github.io' },
    ],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // remark-frontmatter must come before remark-mdx-frontmatter
      'remark-frontmatter',
      // Converts the YAML frontmatter block into `export const frontmatter = {...}`
      'remark-mdx-frontmatter',
      // GitHub Flavored Markdown: tables, strikethrough, task lists
      'remark-gfm',
    ],
    rehypePlugins: [
      // Add id attributes to headings for deep-linking
      'rehype-slug',
      // Wrap headings in anchor links using the slug id
      ['rehype-autolink-headings', { behavior: 'wrap' }],
      // Add image dimensions at build time
      ['rehype-img-size', { dir: 'public' }],
    ],
  },
})

export default withMDX({
  ...nextConfig,
  // Allow .md and .mdx files to be imported and rendered as React components
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
})
