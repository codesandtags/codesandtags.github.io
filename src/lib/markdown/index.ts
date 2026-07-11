/**
 * Blog content access layer — ADR-0002 (Option D implementation).
 *
 * Uses `fs` to enumerate posts and `js-yaml` to extract frontmatter quickly
 * without triggering a full MDX compilation for every file (that would be
 * wasteful for the listing page). The compiled MDX module (for rendering) is
 * imported separately in the detail page via `await import(...)`.
 *
 * File naming convention (ADR-0003 §2.4):
 *   {slug}.mdx   →   slug: "welcome-to-my-blog"
 *   URL: /blog/welcome-to-my-blog
 */

import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { load as yamlLoad } from 'js-yaml'
import readingTime from 'reading-time'
import { validateFrontmatter } from './validate'
import type { BlogPost } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

/**
 * Extracts the YAML frontmatter block and the markdown body from a raw MDX string.
 * Handles both LF and CRLF line endings.
 */
function parseFrontmatter(source: string): {
  data: Record<string, unknown>
  content: string
} {
  const match = source.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)/)
  if (!match) return { data: {}, content: source }

  return {
    data: (yamlLoad(match[1]) ?? {}) as Record<string, unknown>,
    content: match[2],
  }
}

/**
 * Returns all published (draft: false) blog posts sorted newest-first.
 * Safe to call in any React Server Component or `generateStaticParams`.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = (await readdir(BLOG_DIR)).filter((f) => /\.mdx?$/.test(f))

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const source = await readFile(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = parseFrontmatter(source)
      const frontmatter = validateFrontmatter(slug, data)
      const { text: readingTimeText } = readingTime(content)

      return {
        slug,
        frontmatter,
        readingTime: readingTimeText,
      } satisfies BlogPost
    })
  )

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

/**
 * Returns a single blog post by slug.
 * Throws if the file does not exist (triggers the not-found page in Next.js).
 */
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const source = await readFile(filePath, 'utf-8')
  const { data, content } = parseFrontmatter(source)
  const frontmatter = validateFrontmatter(slug, data)
  const { text: readingTimeText } = readingTime(content)

  return {
    slug,
    frontmatter,
    readingTime: readingTimeText,
  }
}
