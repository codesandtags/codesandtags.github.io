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

**We adopt Option B: `gray-matter` + `next-mdx-remote`**, with the following plugin stack:

| Concern | Package | Rationale |
|---|---|---|
| Frontmatter parsing | `gray-matter` | Zero-config YAML parsing, compatible with Jekyll/Astro formats |
| MDX rendering | `next-mdx-remote` | RSC-compatible via `/rsc` export, highly optimized for Vercel builds |
| Code highlighting | `rehype-pretty-code` + `shiki` | Shiki-powered, zero client JS, 200+ themes, line numbers, diff support |
| GFM (tables, strikethrough) | `remark-gfm` | GitHub Flavored Markdown compatibility |
| Heading anchors | `rehype-slug` + `rehype-autolink-headings` | Deep-linkable headings for long technical posts |
| Reading time | `remark-reading-time` | Exposes estimated read time for listing cards |

### Code Highlighting Configuration

Code blocks will use `rehype-pretty-code` with the `github-dark` theme, matching the site's dark-mode aesthetic. The following features will be enabled:

```mdx
```typescript title="src/lib/markdown/index.ts" {3-5}
// Title annotations, highlighted line ranges, and diff markers
- const old = 'remove this'
+ const improved = 'add this'
```
```

### Hero Image Rendering

Hero images will be declared in frontmatter as `heroImage: /images/blog/post-slug/hero.jpg` and rendered via Next.js's `<Image>` component with `priority` set, ensuring LCP optimization on post pages.

### SEO & Social Sharing

Each post page will call `generateMetadata()` with the following Open Graph and Twitter card fields sourced from post frontmatter:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      authors: ['Edwin Torres'],
      images: [{ url: post.frontmatter.heroImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [post.frontmatter.heroImage],
      creator: '@codesandtags',
    },
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

- [next-mdx-remote GitHub](https://github.com/hashicorp/next-mdx-remote)
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app/)
- [Shiki Themes](https://shiki.style/themes)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [Contentlayer status — community thread](https://github.com/contentlayerdev/contentlayer/issues/429)
- [Velite — Contentlayer successor](https://velite.js.org/)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
