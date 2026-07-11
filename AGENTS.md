# Agent Instructions & Project Guidelines (AGENTS.md)

Welcome, AI Agent! This file outlines the repository structure, code patterns, and constraints for **codesandtags.github.io**. Please read and adhere to these guidelines to maintain a clean, secure, and high-quality codebase.

---

## 1. Project Overview

*   **Owner**: [Edwin Torres](https://github.com/codesandtags)
*   **Project**: Personal website, portfolio, and blog (`codesandtags.github.io`).
*   **Architecture**: A **modular single Next.js application** (see [ADR-0001](docs/adrs/0001-monorepo-strategy.md)). The legacy blog at [codesandtags/blog](https://github.com/codesandtags/blog) will be integrated into this repo rather than maintained as a separate deployment.

### Tech Stack

Pinned versions reflect `package.json` / `package-lock.json` as of the current workspace:

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | `16.2.x` |
| **UI** | React | `19.2.x` |
| **Language** | TypeScript | `5.9.x` |
| **Styling** | Tailwind CSS | `3.4.x` |
| **CSS processing** | PostCSS | `8.5.x` |
| **Linting** | ESLint (`eslint-config-next`) | `9.x` / `16.2.x` |
| **Component system** | [shadcn/ui](https://ui.shadcn.com/) (New York style) + Radix UI + Lucide icons | — |
| **Analytics** | `@vercel/analytics` | `1.6.x` |
| **Deployment target** | Vercel | — |
| **Node.js** | Volta-pinned | `22.12.0` |

> **Note:** CI currently runs on Node.js 20 (see `.github/workflows/ci.yml`), while local development is pinned to Node 22 via Volta. Align these when updating CI.

---

## 2. Directory Structure

### Current layout

```
.
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions quality gate (Lint, Type-check, Build)
├── docs/
│   └── adrs/                      # Architecture Decision Records (ADRs)
│       ├── 0001-monorepo-strategy.md
│       ├── 0002-mdx-content-pipeline.md
│       └── 0003-blog-frontmatter-schema.md
├── public/
│   └── img/                       # Site images (e.g. codesandtags.svg)
├── src/
│   ├── app/                       # Next.js App Router — all routes
│   │   ├── experience/            # /experience
│   │   ├── projects/              # /projects
│   │   ├── talks/                 # /talks
│   │   ├── what-i-use/            # /what-i-use
│   │   ├── layout.tsx             # Root layout (Navbar, ThemeProvider, metadata)
│   │   ├── page.tsx               # / — home
│   │   ├── globals.css            # Global styles & CSS variables (shadcn tokens)
│   │   ├── not-found.tsx          # 404 page
│   │   ├── robots.ts              # robots.txt generation
│   │   ├── sitemap.ts             # sitemap.xml generation
│   │   └── manifest.ts            # web app manifest
│   ├── components/
│   │   └── ui/                    # Shared UI (shadcn + custom)
│   │       ├── Navbar.tsx, Footer.tsx, Hero.tsx, ThemeProvider.tsx
│   │       ├── FeaturedWork.tsx, Features.tsx, ContactSection.tsx
│   │       ├── button.tsx, badge.tsx, navigation-menu.tsx
│   │       └── Hero.module.css
│   ├── lib/
│   │   └── utils.ts               # Shared utilities (`cn` tailwind-merge helper)
│   └── types/
│       ├── menu.ts                # Navigation menu types
│       └── project.ts             # Project card types
├── components.json                # shadcn/ui configuration
├── next.config.ts                 # Next.js config (image domains, rewrites)
├── tailwind.config.ts             # Tailwind + shadcn theme extensions
├── postcss.config.mjs
├── eslint.config.mjs              # ESLint flat config (Next.js core-web-vitals)
├── tsconfig.json                  # Path alias: `@/*` → `./src/*`
└── .prettierrc
```

### Planned additions (blog integration — ADR-0001)

These paths are **not yet present** but are the target structure for blog work:

```
src/
├── app/
│   └── blog/
│       ├── page.tsx               # /blog — post list
│       └── [slug]/
│           └── page.tsx           # /blog/[slug] — individual post
├── content/
│   └── blog/                      # Markdown / MDX source files
└── lib/
    └── markdown/                  # Frontmatter parsing, slug generation

public/
└── images/
    └── blog/                      # Static images referenced by blog posts
```

---

## 3. Architecture Decision Records

Significant architectural choices are documented under `docs/adrs/`. Read the relevant ADR **before** making structural changes.

| ADR | Status | Topic |
|---|---|---|
| [ADR-0001](docs/adrs/0001-monorepo-strategy.md) | Proposed | Modular single Next.js app (chosen over Turborepo monorepo and Astro migration) |
| [ADR-0002](docs/adrs/0002-mdx-content-pipeline.md) | Proposed | Markdown / MDX parsing strategy (`gray-matter` + `next-mdx-remote`) |
| [ADR-0003](docs/adrs/0003-blog-frontmatter-schema.md) | Proposed | Blog post frontmatter schema & migration guide |
| ADR-0004 | Pending | Image optimization for blog assets |

**Key constraints from ADR-0001:**
- Vercel is the deployment platform, removing static-only deployment limits but still favoring static/ISR for speed.
- All content must live under one origin (`codesandtags.io`).
- Module boundaries are enforced by convention and path aliases (`@/lib`, `@/components/ui`), not workspace tooling.

---

## 4. Core Development Rules

### Dependency Management & Security
1.  **Vulnerability Checks**: Always verify that additions or upgrades do not introduce security vulnerabilities. Run `npm audit` frequently.
2.  **Transitive Overrides**: If a sub-dependency (like `postcss` within `next`) reports a vulnerability and cannot be upgraded directly, use the `"overrides"` block in [package.json](package.json) to force secure resolution.
3.  **Strict Linting & Types**: Keep the build strict. Ensure `npm run lint` and `npm run type-check` pass successfully before proposing any commit or PR.

### Coding Style & Design
1.  **Modern React / TypeScript**: Use TypeScript strictly. Define components using functional syntax. Avoid `any` where possible.
2.  **Path aliases**: Import from `@/components/ui`, `@/lib`, and `@/types` — never use deep relative paths across module boundaries.
3.  **Tailwind CSS**: Follow mobile-first design principles. Use shadcn CSS variables defined in `globals.css` for theming (light/dark via `ThemeProvider`).
4.  **shadcn/ui**: New primitives should be added via the shadcn CLI (`components.json` is configured). Extend existing `ui/` components rather than duplicating patterns.
5.  **Rich Aesthetics**: The website should showcase professional design aesthetics—vibrant but balanced color palettes, appropriate typography, smooth hover states, and clear interactive feedback.
6.  **No Placeholders**: Never commit raw placeholders. If an image or media is needed, ensure it is fully generated or correctly placed in the `public/` directory.

### Module Boundaries (ADR-0001)
- `src/app/` — routing and page-level composition only.
- `src/components/ui/` — presentational, reusable React components.
- `src/lib/` — pure utilities and data-access logic (e.g. future markdown parsing).
- `src/types/` — shared TypeScript interfaces.
- Avoid importing `lib/` internals from `components/ui/` in ways that create circular dependencies. Catch coupling in code review.

---

## 5. Blog Integration Workflow

When integrating the legacy blog from [codesandtags/blog](https://github.com/codesandtags/blog), follow the structure defined in [ADR-0001](docs/adrs/0001-monorepo-strategy.md):

1.  **Content Migration**: Import markdown/MDX articles into `src/content/blog/`.
2.  **Asset Management**: Place static images referenced by posts in `public/images/blog/`.
3.  **Route Setup**: Create `/blog` (list) and `/blog/[slug]` (post) under `src/app/blog/`, consistent with the global theme.
4.  **Markdown Layer**: Add parsing logic under `src/lib/markdown/` (refer to ADR-0002).
5.  **SEO**: Every blog page must render metadata via Next.js `generateMetadata` (title, description, Open Graph).
6.  **Vercel Deployment**: Ensure the build configuration on Vercel is properly hooked up to deploy the single Next.js project.

---

## 6. Git and CI/CD Workflow

1.  **Branching Strategy**:
    *   Create separate feature branches from `main` (e.g. `feature/integrate-blog-posts` or `bugfix/fix-mobile-navbar`).
2.  **Pre-Commit Verification**:
    Run the quality gates locally before finalizing work:
    ```bash
    npm run lint
    npm run type-check
    npm run build
    ```
    Or run all three in one step:
    ```bash
    npm run test:ci
    ```
3.  **Pull Requests**:
    *   Create descriptive pull requests detailing the changes.
    *   Ensure all CI quality gate checks in [ci.yml](.github/workflows/ci.yml) pass.
    *   For architectural changes, add or update an ADR in `docs/adrs/` and reference it in the PR description.
