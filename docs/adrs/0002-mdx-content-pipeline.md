# ADR 0002: MDX Content Pipeline — Parsing, Code Highlighting, and Rendering Strategy

| Field | Value |
|---|---|
| **ID** | ADR-0002 |
| **Status** | Proposed |
| **Date** | 2026-07-11 |
| **Author** | Edwin Torres ([@codesandtags](https://github.com/codesandtags)) |
| **Deciders** | Edwin Torres |
| **Depends On** | [ADR-0001](./0001-monorepo-strategy.md) — Modular Single Next.js Application |
| **Review** | Pending approval |

---

## 1. Context & Problem Statement

ADR-0001 established that blog content will live under `src/content/blog/` as Markdown/MDX files and be rendered via Next.js App Router dynamic routes at `/blog/[slug]`. This ADR addresses the **next critical sub-decision**: how to parse, process, and render that content.

The legacy blog ([codesandtags/blog](https://github.com/codesandtags/blog)) was built with **Astro + `@astrojs/mdx`**. All 12 existing posts are plain `.md` files with legacy YAML frontmatter (Jekyll/Chirpy schema format). Migrating them requires a parsing pipeline that is:

1. **Compatible with Next.js 16 App Router on Vercel**: The pipeline must run efficiently in Vercel's build environment and edge/serverless runtime. We can leverage Static Site Generation (SSG) or Incremental Static Regeneration (ISR) to optimize load speed and eliminate database roundtrips.
2. **MDX-capable**: The new pipeline must support MDX (`.mdx`) to allow embedding React components inside post content — enabling future rich features like interactive diagrams, custom callouts, and embedded code playgrounds.
3. **Code block syntax highlighting**: Posts are technical articles on software engineering and architecture. Code blocks with language-specific highlighting are a hard requirement, not a nice-to-have.
4. **Hero image support**: Each post must be able to declare a featured image rendered prominently at the top of the post, referenced via frontmatter.
5. **Full SEO metadata surface**: The pipeline must expose enough structured data per post (title, description, date, tags, canonical URL, Open Graph image) to power `generateMetadata()` per page.
6. **Social sharing (Twitter/X & LinkedIn)**: Each post page must emit `og:image`, `og:title`, `og:description`, `twitter:card`, `twitter:image`, and `article:published_time` meta tags driven by per-post frontmatter.
7. **Low maintenance**: The chosen solution must be actively maintained, compatible with the locked Node 22 environment, and not require a separate compilation step outside of `next build`.

### Existing Content Inventory

The legacy blog has **12 posts**, all in `.md` format, using a Jekyll-legacy frontmatter schema:

```markdown
---
layout: post
title: "Fundamentals of Software Architecture Book - Part 1"
date: 2023-07-17 20:15 -0500
author: codesandtags
categories: [Software Architecture]
tags: [books, fundamentals, software]
---
```

The migration path must parse this frontmatter schema while allowing us to clean up and enhance it (e.g., adding `description` and `heroImage` support, removing the deprecated `layout` tag, and converting timezone-offset dates into clean ISO dates — see ADR-0003).

---

## 2. Options Considered

### Option A: `@next/mdx` (Official Next.js MDX Plugin)

The officially supported approach from the Next.js team. MDX files are treated as regular pages/components via webpack/Turbopack transforms.

**Setup sketch:**
```ts
// next.config.ts
import createMDX from '@next/mdx'
const withMDX = createMDX({ options: { remarkPlugins: [], rehypePlugins: [] } })
export default withMDX({ pageExtensions: ['ts', 'tsx', 'mdx'] })
```

**Genuine advantages:**
- Officially maintained by Vercel/Next.js team. Unlikely to be abandoned.
- Zero runtime overhead: MDX files are compiled to React components at build time.
- Full MDX: React components can be imported directly inside `.mdx` files.
- Turbopack-compatible from Next.js 15+.

**Critical trade-offs:**
- **File system is the content API.** There is no programmatic way to query all posts (e.g., for the `/blog` listing page) without using `fs` to glob and parse frontmatter separately. This creates a split: `@next/mdx` renders the post body, but `gray-matter` (or equivalent) must be used alongside it to read frontmatter for listing pages.
- **Cannot `generateStaticParams` easily.** Deriving slugs from a list of MDX files requires an additional file-listing utility. The two systems do not share a data model.
- **No built-in frontmatter extraction.** Frontmatter must be exported as a named `export const metadata` from each MDX file — a non-standard pattern that breaks migration from the legacy `.md` files without modifying every file.
- **Poor migration story.** The 12 existing `.md` files must be renamed to `.mdx` and their frontmatter exported as JSX syntax — significant manual effort.

**Verdict:** Good for greenfield content authored from scratch. Poor fit for migrating an existing frontmatter-based content library.

---

### Option B: `gray-matter` + `next-mdx-remote`

A widely adopted, community-standard pattern for content-heavy Next.js applications. `gray-matter` parses YAML frontmatter; `next-mdx-remote` serializes and renders MDX/Markdown body content.

**Setup sketch:**
```ts
// src/lib/markdown/index.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

export async function getPostBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
    },
  })
  return { frontmatter, mdxSource }
}
```

**Genuine advantages:**
- **Frontmatter is a first-class citizen.** `gray-matter` reads YAML frontmatter identically to how Astro reads it — the 12 existing `.md` posts migrate with zero frontmatter parsing changes.
- **Unified content API.** One function can return all posts with frontmatter for the listing page and a single post's rendered body for the detail page — sharing one data model.
- **Vercel deployment compatible.** Performs static generation at build time during `generateStaticParams` and can also run dynamically or via ISR (Incremental Static Regeneration) on Vercel if needed.
- **Remark/Rehype plugin ecosystem.** Full access to `remark-gfm` (GitHub Flavored Markdown), `rehype-pretty-code` (code highlighting with Shiki), `rehype-slug`, `remark-reading-time`, and hundreds more.
- **Battle-tested at scale.** Used by Vercel, Planetscale, and many personal developer sites on Next.js.

**Critical trade-offs:**
- **Two packages to understand** (`gray-matter` + `next-mdx-remote`) instead of one. Slightly more boilerplate than `@next/mdx`.
- **`next-mdx-remote` v5 dropped RSC (React Server Component) support** for its `MDXRemote` client component, requiring explicit `'use client'` in the render component. The `next-mdx-remote/rsc` export partially addresses this but is still maturing.
- **No type safety on frontmatter** out of the box. Frontmatter is typed as `Record<string, unknown>` unless wrapped with a custom TypeScript type (see ADR-0003).

**Verdict:** The most pragmatic and migration-friendly option. Directly solves every requirement with minimal overhead.

---

### Option C: Contentlayer v2 (or Velite as successor)

A type-safe content SDK that generates TypeScript types from a content schema definition and integrates with Next.js via a webpack plugin.

**Genuine advantages:**
- **End-to-end type safety**: Define a `defineDocumentType` schema and every field in frontmatter is fully typed — no runtime casting.
- **Automatic slug generation, reading time, and content graph** built in.
- **Generated data layer**: `import { allPosts } from 'contentlayer/generated'` gives instant access to all posts with full types, zero `fs` calls in page components.

**Critical trade-offs:**
- **Contentlayer is effectively unmaintained.** The project's primary maintainer departed in 2024. The GitHub repository has open critical issues with no response. The community has forked it as [Velite](https://velite.js.org/), but Velite is not yet stable and its API is in flux.
- **Next.js 15+ / Turbopack compatibility is broken.** Contentlayer's webpack plugin does not support Turbopack. Using it forces the project back to the slower Webpack dev server, directly violating the fast builds goal from ADR-0001.
- **Node 22 compatibility issues.** Several reported issues with `contentlayer` on Node 22 remain unresolved upstream.

> [!CAUTION]
> Adopting an unmaintained dependency as the foundation of the content pipeline is a serious architectural risk. A security vulnerability or Next.js breaking change in Contentlayer would have no upstream fix.

**Verdict:** Architecturally superior design, but the maintenance situation is a hard blocker for a long-lived production project.

---

## 3. Decision

**We adopt Option D: `@next/mdx` + `remark-frontmatter` + `remark-mdx-frontmatter`**, with the following plugin stack as implemented:

### 3.1 Plugin Stack

| Concern | Package | Layer | Notes |
|---|---|---|---|
| MDX rendering | `@next/mdx` | `withMDX` (next.config.ts) | Official Vercel plugin; Turbopack-compatible |
| Frontmatter parsing (YAML → object) | `js-yaml` | `src/lib/markdown/index.ts` | Used directly via `fs` + regex — see §3.2 |
| GFM (tables, strikethrough) | `'remark-gfm'` (string) | `withMDX` | Passed as string per Turbopack constraint |
| Frontmatter → ESM export | `'remark-frontmatter'` + `'remark-mdx-frontmatter'` (strings) | `withMDX` | Makes `export const frontmatter` available in detail pages |
| Heading anchors | `'rehype-slug'` + `'rehype-autolink-headings'` (strings) | `withMDX` | Deep-linkable headings |
| Reading time | `reading-time` | `src/lib/markdown/index.ts` | Called directly on raw markdown body |
| Code highlighting | `rehype-pretty-code` + `shiki` | ⚠️ Temporarily excluded | See §3.2 — Turbopack constraint |

### 3.2 Turbopack Constraint Discovery

> [!IMPORTANT]
> **Turbopack (Next.js 16 default bundler) requires all plugin options passed to `withMDX` to be JSON-serialisable.** It runs in a Rust context and cannot execute JavaScript function references during the build phase.

This caused two implementation deviations from the original Option D sketch:

**Deviation 1 — Plugin identifiers must be strings, not imports:**
```ts
// ❌ Fails with: "loader does not have serializable options"
import remarkGfm from 'remark-gfm'
const withMDX = createMDX({ options: { remarkPlugins: [remarkGfm] } })

// ✅ Turbopack-compatible — @next/mdx resolves these by name internally
const withMDX = createMDX({ options: { remarkPlugins: ['remark-gfm'] } })
```

**Deviation 2 — Frontmatter parsing moved to the lib layer:**
While `remark-frontmatter` + `remark-mdx-frontmatter` are installed and wired as strings in the `withMDX` chain (making `export const frontmatter` available in the compiled MDX module on detail pages), the **listing page** uses `fs.readFileSync` + `js-yaml` directly to extract frontmatter without triggering a full MDX compilation per file — which is both faster and simpler:

```ts
// src/lib/markdown/index.ts
import { load as yamlLoad } from 'js-yaml'
import readingTime from 'reading-time'

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)/)
  return {
    data: (yamlLoad(match![1]) ?? {}) as Record<string, unknown>,
    content: match![2],
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = (await readdir(BLOG_DIR)).filter((f) => /\.mdx?$/.test(f))
  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const source = await readFile(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = parseFrontmatter(source)
      const frontmatter = validateFrontmatter(slug, data)
      return { slug, frontmatter, readingTime: readingTime(content).text }
    })
  )
}
```

**Deviation 3 — `rehype-pretty-code` temporarily excluded:**
Even passed as a string, `rehype-pretty-code` internally spawns a Shiki WASM bundler that creates non-serialisable objects, causing the same build error. Code blocks render with `bg-card` styling today. Syntax colour highlighting will be re-enabled once Turbopack ships full ESM plugin support.
> Track: https://github.com/vercel/next.js/issues/64525

### 3.3 File Naming Convention (Implemented)

Post filenames use the slug directly as the filename (not the `YYYY-MM-DD-` prefix from the original ADR-0003 draft). This enables clean dynamic imports in the detail page without a slug→filename lookup:

```
{slug}.mdx   →   slug: "welcome-to-my-blog"
URL: /blog/welcome-to-my-blog
```

Chronological ordering is achieved via `frontmatter.date` sort in `getAllPosts()`, not the filesystem.

### 3.4 Hero Image & SEO (Implemented)

Hero images are declared in frontmatter as `heroImage: /images/blog/slug/hero.jpg` and rendered via `<Image priority>` for LCP optimisation. When absent, the listing card renders a gradient placeholder.

Each post page calls `generateMetadata()` with full Open Graph + Twitter card fields sourced from frontmatter:

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const { title, description, heroImage, date, updatedAt, tags } = post.frontmatter
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      publishedTime: date,
      modifiedTime: updatedAt,
      authors: ['Edwin Torres'],
      images: heroImage
        ? [{ url: heroImage, width: 1200, height: 630 }]
        : [{ url: '/img/profile-v1.webp', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', creator: '@codesandtags' },
  }
}
```

---


## 4. Consequences

### Positive

- The 12 existing `.md` posts migrate easily (only require basic layout field removals, date format normalization, and asset path updates during migration — see ADR-0003).
- Code blocks with syntax highlighting, line highlights, diff markers, and file name annotations are available from day one.
- SEO metadata (Open Graph, Twitter Card, `article:published_time`) is fully driven by per-post frontmatter with zero manual HTML edits.
- The `rehype-pretty-code` renderer emits zero client-side JavaScript — code highlighting is purely static HTML/CSS.
- `remark-reading-time` exposes a `readingTime` field that can be shown on listing cards and post headers.
- Since we are deploying on Vercel, we can choose between fully Static Site Generation (SSG) or ISR if we ever decide to change how content is fetched.

### Negative (Trade-offs Accepted)

- **No automatic type safety on frontmatter.** A custom TypeScript interface (`BlogPostFrontmatter` — defined in ADR-0003) must be maintained manually and applied as a type assertion at the point of `gray-matter` parsing.
- **`next-mdx-remote` RSC export is still maturing.** If breaking changes occur in a future Next.js release, migration effort is bounded (the rendering layer is isolated in `src/lib/markdown/`), but it is a known risk.
- **Two content layers.** Listing pages use `gray-matter` directly on the file system; detail pages use `next-mdx-remote` for rendering. These must stay in sync inside `src/lib/markdown/` — a single developer maintaining both is manageable, but must be documented.

### Follow-up Decisions Required

| ADR | Topic | Priority |
|---|---|---|
| ADR-0003 | Blog post frontmatter schema and content governance | High — blocks migration |
| ADR-0004 | Image optimization strategy for blog assets | Medium |

---

## 5. References

- [`@next/mdx` — Next.js Official Docs](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
- [`remark-mdx-frontmatter`](https://github.com/remcohaszing/remark-mdx-frontmatter)
- [`js-yaml`](https://github.com/nodeca/js-yaml)
- [`reading-time`](https://github.com/ngryman/reading-time)
- [`rehype-slug`](https://github.com/rehypejs/rehype-slug)
- [`rehype-autolink-headings`](https://github.com/rehypejs/rehype-autolink-headings)
- [`rehype-pretty-code`](https://rehype-pretty-code.netlify.app/) _(installed, pending Turbopack re-enablement)_
- [Shiki Themes](https://shiki.style/themes)
- [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
- [next-mdx-remote — Archived April 9, 2026](https://github.com/hashicorp/next-mdx-remote)
- [Contentlayer status](https://github.com/contentlayerdev/contentlayer/issues/429)
- [Velite — Contentlayer successor](https://velite.js.org/)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Turbopack serialisable options issue](https://github.com/vercel/next.js/issues/64525)
