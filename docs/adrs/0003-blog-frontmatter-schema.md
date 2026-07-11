# ADR 0003: Blog Post Frontmatter Schema and Content Governance

| Field | Value |
|---|---|
| **ID** | ADR-0003 |
| **Status** | Proposed |
| **Date** | 2026-07-11 |
| **Author** | Edwin Torres ([@codesandtags](https://github.com/codesandtags)) |
| **Deciders** | Edwin Torres |
| **Depends On** | [ADR-0001](./0001-monorepo-strategy.md) — Modular Single Next.js Application |
| **Depends On** | [ADR-0002](./0002-mdx-content-pipeline.md) — MDX Content Pipeline |
| **Review** | Pending approval |

---

## 1. Context & Problem Statement

ADR-0002 established that `gray-matter` will parse YAML frontmatter from `.mdx` files. `gray-matter` returns frontmatter as an untyped `Record<string, unknown>` object. Without a formal, versioned schema, the following failure modes are possible:

1. **Silent runtime errors**: A missing required field (e.g., `description`) causes the SEO `generateMetadata()` to emit an empty string to search crawlers — a silent failure with real SEO consequences.
2. **Inconsistent content**: Some posts have `categories`, others have `topics`, others have neither. The listing page cannot filter or group posts reliably.
3. **Broken social cards**: If `heroImage` is missing or incorrectly pathed, Open Graph images silently fall back to the site default, missing the per-post sharing opportunity.
4. **Migration drift**: Migrating 12 existing posts from the legacy blog without a schema contract risks introducing field naming inconsistencies (`image` vs. `heroImage`, `date` vs. `publishedAt`) or parsing errors due to legacy formats.

The frontmatter schema is the **contract between content authors and the rendering engine**. A poorly defined contract is a source of subtle bugs that are expensive to debug.

### Existing Frontmatter (Legacy Blog)

The 12 posts from [codesandtags/blog](https://github.com/codesandtags/blog) use this shape:

```yaml
layout: post
title: "Fundamentals of Software Architecture Book - Part 1"
date: 2023-07-17 20:15 -0500
author: codesandtags
categories: [Software Architecture]
tags: [books, fundamentals, software]
```

**Gaps/Formatting issues identified in this schema:**
- `layout: post` → Redundant Jekyll/Astro layout tag; should be stripped as layouts are governed globally by Next.js.
- `date: 2023-07-17 20:15 -0500` → timezone-offset formats can cause parsing inconsistencies across Node versions; must be converted to standard ISO date strings (`YYYY-MM-DD`).
- No `description` / `excerpt` field → cannot populate `og:description` or listing cards without parsing post body.
- No `slug` field → slug must be derived from filename (acceptable, but must be documented as a rule).
- No `updatedAt` field → cannot show "last updated" timestamps or signal freshness to crawlers.
- No `readingTime` field → must be computed at parse time (handled by `remark-reading-time`).
- No `ogImage` field distinct from `image` → the hero image and the social card image may need to differ in aspect ratio (blog hero: variable; OG image: 1200×630).
- `categories` and `tags` overlap in purpose — both exist without a defined distinction.

---

## 2. Decision: The Canonical Frontmatter Schema

### 2.1 Field Specification

The following is the canonical frontmatter schema for all blog posts in this repository. Fields marked **required** will be validated at build time. Fields marked **optional** have defined fallback behaviors.

```yaml
# ─── IDENTITY ────────────────────────────────────────────────────
title: "Fundamentals of Software Architecture – Part 1"   # REQUIRED
description: "A deep-dive into the core concepts of..."   # REQUIRED — used for og:description and listing cards

# ─── TAXONOMY ────────────────────────────────────────────────────
tags: ["architecture", "software-design", "engineering"]  # REQUIRED — at least 1; drives filtering and related posts
categories: ["Engineering", "Career"]                     # OPTIONAL — high-level grouping for navigation

# ─── DATES ───────────────────────────────────────────────────────
date: 2024-01-15                                          # REQUIRED — ISO 8601 YYYY-MM-DD, used for sorting and article:published_time
updatedAt: 2024-06-01                                     # OPTIONAL — YYYY-MM-DD, used in article:modified_time; omit if never updated

# ─── AUTHORSHIP ──────────────────────────────────────────────────
author: codesandtags                                      # OPTIONAL — defaults to "Edwin Torres" if omitted

# ─── VISUAL ASSETS ───────────────────────────────────────────────
heroImage: /images/blog/software-architecture-part-1/hero.jpg  # OPTIONAL — rendered at top of post; falls back to site default OG image
heroImageAlt: "Abstract diagram of software layers"             # REQUIRED if heroImage is set — accessibility and SEO

# ─── PUBLISHING ──────────────────────────────────────────────────
draft: false                                              # REQUIRED — draft:true posts are excluded from builds and sitemaps
featured: false                                           # OPTIONAL — surfaces the post in the "Featured" section on the home page
```

### 2.2 TypeScript Interface

The schema above is encoded as a TypeScript interface and enforced at the point of `gray-matter` parsing inside `src/lib/markdown/index.ts`.

```ts
// src/types/blog.ts

export interface BlogPostFrontmatter {
  // Identity
  title: string
  description: string

  // Taxonomy
  tags: string[]
  categories?: string[]

  // Dates
  date: string           // ISO 8601: "YYYY-MM-DD"
  updatedAt?: string     // ISO 8601: "YYYY-MM-DD"

  // Authorship
  author?: string        // Defaults to "Edwin Torres"

  // Visual assets
  heroImage?: string     // Absolute path from /public, e.g. /images/blog/slug/hero.jpg
  heroImageAlt?: string  // Required when heroImage is present

  // Publishing
  draft: boolean
  featured?: boolean     // Default: false
}

export interface BlogPost {
  slug: string           // Derived from filename: "2024-01-15-my-post.mdx" -> "my-post"
  frontmatter: BlogPostFrontmatter
  readingTime: string    // Computed by remark-reading-time: "5 min read"
  content: string        // Raw MDX body (used by next-mdx-remote for rendering)
}
```

### 2.3 Build-Time Validation

A validation function in `src/lib/markdown/validate.ts` will throw at build time if a required field is missing or incorrectly typed, preventing silent failures from reaching production:

```ts
// src/lib/markdown/validate.ts
export function validateFrontmatter(
  slug: string,
  data: Record<string, unknown>
): BlogPostFrontmatter {
  const required = ['title', 'description', 'tags', 'date', 'draft'] as const
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(
        `[Blog] Post "${slug}" is missing required frontmatter field: "${field}". Build aborted.`
      )
    }
  }
  if (data.heroImage && !data.heroImageAlt) {
    throw new Error(
      `[Blog] Post "${slug}" has a heroImage but is missing heroImageAlt. Build aborted.`
    )
  }
  return data as BlogPostFrontmatter
}
```

### 2.4 File Naming Convention

Post filenames follow a strict convention that doubles as the slug source:

```
YYYY-MM-DD-kebab-case-title.mdx
```

**Examples:**
```
2024-01-15-fundamentals-of-software-architecture-part-1.mdx
2024-06-10-lessons-learned-from-staff-engineer-path.mdx
```

The slug is derived by stripping the date prefix:

```ts
// "2024-01-15-fundamentals-of-software-architecture-part-1.mdx"
// → slug: "fundamentals-of-software-architecture-part-1"
const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, '')
```

**Rationale:** The date prefix keeps the file system sorted chronologically (critical for readability as content grows), while the slug strips the date to produce clean, evergreen URLs (`/blog/fundamentals-of-software-architecture-part-1`).

### 2.5 Image Asset Convention

Blog images follow a scoped directory structure under `public/`:

```
public/
└── images/
    └── blog/
        └── fundamentals-of-software-architecture-part-1/
            ├── hero.jpg          # Hero image (referenced in frontmatter as heroImage)
            └── diagram-1.png     # In-post images (referenced in MDX body)
```

Each post gets its own folder named after its slug. This prevents collisions and makes it easy to find and clean up assets if a post is deleted.

---

## 3. Migration Plan for Legacy Posts

The 12 existing posts from the legacy Astro blog require the following transformations during migration:

| Legacy Field | Action | New Field |
|---|---|---|
| `layout` | ❌ Strip / Delete | _(None - layouts are handled globally)_ |
| `title` | ✅ Keep as-is | `title` |
| `date` | ⚠️ Reformat from timezone format (e.g. `2023-07-17 20:15 -0500`) to standard ISO `YYYY-MM-DD` | `date` |
| `author` | ✅ Keep as-is | `author` |
| `tags` | ✅ Keep as-is | `tags` |
| `categories` | ✅ Keep as-is | `categories` |
| `image` / asset path | ⚠️ Migrate images from `/assets/img/posts/...` to `/public/images/blog/<slug>/...` and update markdown paths | `heroImage` |
| `draft` | ✅ Keep as-is | `draft` |
| _(missing)_ | ➕ Add manually per post | `description` |
| _(missing)_ | ➕ Add if applicable | `heroImageAlt` |
| _(missing)_ | ➕ Add if applicable | `updatedAt` |
| _(missing)_ | ➕ Defaults to `false` | `featured` |

> [!IMPORTANT]
> The `description` field must be written manually for each of the 12 legacy posts. It cannot be auto-generated reliably from the post body. This is a one-time manual content task.

---

## 4. Consequences

### Positive

- Build-time validation catches missing fields before any broken page reaches production or a search crawler.
- The TypeScript `BlogPostFrontmatter` interface propagates through the entire data layer — IDE autocomplete works on every frontmatter field in every listing and detail component.
- The file naming convention (date prefix + kebab slug) makes the `src/content/blog/` directory self-documenting and chronologically sorted with no tooling.
- Per-post image scoping (`public/images/blog/<slug>/`) prevents namespace collisions and makes asset management deterministic.

### Negative (Trade-offs Accepted)

- **Manual description authoring for 12 legacy posts.** There is no good automated shortcut. An LLM-generated description is acceptable for migration speed, but each description should be reviewed for accuracy before merging.
- **Schema is not enforced at author time.** There is no frontmatter schema linting at the editor level. A future improvement would be a VS Code extension or a pre-commit hook using `zod` to parse and validate frontmatter before commit.
- **No database.** All filtering, sorting, and search is done in-memory over the array returned by `getAllPosts()`. At the current content volume (12–100 posts), this is fast. Beyond ~500 posts, consider adding a pre-built JSON index file at build time.

### Follow-up Decisions Required

| ADR | Topic | Priority |
|---|---|---|
| ADR-0004 | Image optimization strategy for blog assets | Medium |

---

## 5. References

- [gray-matter](https://github.com/jonschlinkert/gray-matter)
- [Open Graph Protocol — article properties](https://ogp.me/#type_article)
- [Twitter Card documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [Next.js generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org BlogPosting structured data](https://schema.org/BlogPosting)
