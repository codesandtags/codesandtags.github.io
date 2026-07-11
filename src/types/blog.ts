/**
 * TypeScript interfaces for blog post data.
 * Defined per ADR-0003: Blog Post Frontmatter Schema and Content Governance.
 *
 * These types are the single source of truth for frontmatter fields across:
 *   - src/lib/markdown/index.ts  (parsing & validation)
 *   - src/app/blog/page.tsx      (listing)
 *   - src/app/blog/[slug]/page.tsx (detail + generateMetadata)
 *   - src/components/ui/BlogPostCard.tsx
 */

export interface BlogPostFrontmatter {
  // ── Identity ────────────────────────────────────────────────────────────────
  /** Full post title. Used in <h1>, <title>, og:title, twitter:title. */
  title: string
  /** One-sentence summary. Used in og:description, listing cards. */
  description: string

  // ── Taxonomy ─────────────────────────────────────────────────────────────────
  /** Searchable tags. At least 1 required. Drives filtering on /blog. */
  tags: string[]
  /** Optional high-level section grouping, e.g. ["Engineering", "Career"]. */
  categories?: string[]

  // ── Dates ────────────────────────────────────────────────────────────────────
  /** Publication date. ISO 8601 YYYY-MM-DD. Used for sorting and article:published_time. */
  date: string
  /** Last-updated date. ISO 8601 YYYY-MM-DD. Used in article:modified_time if present. */
  updatedAt?: string

  // ── Authorship ───────────────────────────────────────────────────────────────
  /** Defaults to "Edwin Torres" when omitted. */
  author?: string

  // ── Visual assets ────────────────────────────────────────────────────────────
  /** Absolute path from /public, e.g. /images/blog/slug/hero.jpg */
  heroImage?: string
  /** Alt text for heroImage. Required whenever heroImage is set (a11y + SEO). */
  heroImageAlt?: string

  // ── Publishing ───────────────────────────────────────────────────────────────
  /** draft:true posts are excluded from builds, listings, and sitemaps. */
  draft: boolean
  /** Surfaces the post in the "Featured" block on the home page. Default: false. */
  featured?: boolean
}

export interface BlogPost {
  /** URL-safe identifier derived from filename (no date prefix, no extension). */
  slug: string
  frontmatter: BlogPostFrontmatter
  /** Human-readable reading time computed by the `reading-time` package. e.g. "5 min read" */
  readingTime: string
}
