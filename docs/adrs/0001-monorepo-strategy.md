# ADR 0001: Content Architecture Strategy for Blog Integration and Repository Consolidation

| Field | Value |
|---|---|
| **ID** | ADR-0001 |
| **Status** | Proposed |
| **Date** | 2026-07-11 |
| **Author** | Edwin Torres ([@codesandtags](https://github.com/codesandtags)) |
| **Deciders** | Edwin Torres |
| **Review** | Pending approval |

---

## 1. Context & Problem Statement

The personal portfolio at `codesandtags.github.io` and the legacy blog at [codesandtags/blog](https://github.com/codesandtags/blog) currently exist as two separate repositories with no shared code, no shared design system, and no integration between them. This fragmentation was acceptable at the time both were bootstrapped independently, but it creates compounding friction:

- **Design drift**: Portfolio and blog maintain separate stylesheets, color systems, and typography with no guarantee of visual consistency.
- **Developer velocity**: Making a global change (e.g., updating a navbar link or aligning a button style) requires two separate PRs across two separate repos.
- **Content gap**: Blog posts are no longer visible from the portfolio, breaking the discoverability of published writing.
- **Operational burden**: Two CI pipelines, two dependency trees, two deployment configurations to maintain.

This is a **one-way-door decision**. The folder structure, routing model, and module boundaries we establish now will define how every future feature (blog, projects, case studies, open source section) is added to this project. Reverting a wrong decision here would require a full re-architecture.

### Hard Constraints

The following constraints are **non-negotiable** and must be satisfied by any candidate option:

1. **GitHub Pages deployment**: The project is statically exported and served via GitHub Pages under a single domain. No server runtime is available.
2. **Single domain (`codesandtags.io`)**: All content — portfolio, blog, future sections — must coexist under one origin.
3. **TypeScript-first**: All code must be type-safe. No `any` escapes.
4. **Node.js v22 (Volta-pinned)**: The toolchain must be compatible with the pinned Node.js version.

### Engineering Goals

In addition to the hard constraints, the chosen architecture must satisfy all of the following:

| Goal | Description |
|---|---|
| **UI/UX Consistency** | One source of truth for design tokens, themes, typography, and layout. |
| **Reusable UI Components** | Components (Navbar, Footer, Card, Badge, Button) are written once and used everywhere. |
| **Reusable Internal Libraries** | Utilities, markdown parsers, and data-access functions are isolated in logical modules and imported by alias. |
| **Scalable Routing** | Adding a new section (e.g., `/case-studies`, `/open-source`) must not require significant scaffolding. |
| **Code Splitting** | Each route loads only the JS and CSS it needs. The blog page does not pay the cost of the portfolio's code and vice versa. |
| **Fast Development Builds** | Local HMR (hot-module replacement) must be near-instant. Production builds should complete in under 60 seconds for a project of this scale. |
| **Coding Standards Consistency** | A single ESLint, TypeScript, and Prettier configuration governs all source code. |

---

## 2. Options Considered

### Option A: Multi-Package Workspace Monorepo (Turborepo + npm Workspaces)

A true monorepo using workspace tooling: separate packages for the UI library, utilities, and each application.

**Proposed structure:**
```
.
├── apps/
│   ├── portfolio/       # Next.js app (portfolio pages)
│   └── blog/            # Next.js or Astro app (blog)
└── packages/
    ├── ui/              # Shared React component library
    ├── config/          # Shared ESLint, TSConfig, Tailwind configs
    └── lib/             # Shared utilities and markdown parsing
```

**Genuine advantages:**
- Enforces hard package boundaries via `package.json` scoping. No accidental coupling.
- Packages in `packages/ui` can theoretically be published to npm or reused in entirely separate projects.
- Turborepo's remote caching makes large-scale builds efficient when many packages exist.
- The standard pattern at organizations with many engineers or separate deployment targets.

**Critical trade-offs for this specific project:**
- **GitHub Pages is a hard blocker for co-deployment.** GitHub Pages serves one static directory per repo. To deploy two apps (`portfolio` and `blog`) under a single domain, a custom post-build script must merge the two `out/` directories. This is brittle, poorly documented, and fails silently on path collisions.
- **Significant tooling overhead at current scale.** This project has one developer and ~10 pages today. Workspace orchestration adds `turbo.json`, inter-package symlinks, and multi-`tsconfig.json` coordination — all for marginal benefit at this scale.
- **Turbopack does not support workspaces.** Next.js 16's Turbopack-based dev server does not have first-class support for Turborepo workspaces. Using both together means falling back to slower Webpack for local development, undermining the fast build goal.

**Verdict:** Architecturally sound for teams and large projects. Wrong tool for this project today given the deployment constraint and team size. Introduces more problems than it solves.

---

### Option B: Modular Single Next.js Application (Recommended)

A single Next.js project organized with strict internal module conventions enforced via TypeScript path aliases and folder structure contracts.

**Proposed structure:**
```
.
├── docs/
│   └── adrs/                  # Architecture Decision Records
├── public/
│   └── images/
│       └── blog/              # Static images referenced by blog posts
└── src/
    ├── app/                   # Next.js App Router — all routes live here
    │   ├── blog/
    │   │   ├── page.tsx       # /blog — list of posts
    │   │   └── [slug]/
    │   │       └── page.tsx   # /blog/[slug] — individual post
    │   ├── experience/
    │   ├── projects/
    │   ├── talks/
    │   ├── what-i-use/
    │   ├── layout.tsx         # Root layout (Navbar, Footer, ThemeProvider)
    │   └── page.tsx           # / — home
    ├── components/
    │   └── ui/                # Shared, reusable React components
    ├── content/
    │   └── blog/              # Markdown / MDX source files for blog posts
    │       └── my-first-post.mdx
    ├── lib/                   # Internal logical modules (path-aliased)
    │   ├── markdown/          # MDX parsing, frontmatter extraction, slug generation
    │   └── utils.ts           # General-purpose utility functions
    └── types/                 # Shared TypeScript interfaces and types
```

**Genuine advantages:**
- **Zero deployment complexity.** `next build` with `output: 'export'` produces one `out/` directory that is served directly by GitHub Pages. No post-build merging or custom scripts.
- **Native code splitting.** The Next.js App Router automatically produces per-route JS bundles. `/blog/[slug]` only loads the markdown renderer; `/` only loads the hero and featured work components.
- **Turbopack works at full capacity.** No workspace overhead means Turbopack handles all HMR and incremental builds natively, delivering sub-100ms refresh times.
- **One configuration surface.** A single `tsconfig.json`, `eslint.config.mjs`, `tailwind.config.ts`, and `package.json` cover all code uniformly.
- **Path aliases enforce module contracts.** Import paths like `@/lib/markdown` and `@/components/ui` create a clear, readable dependency graph without the weight of workspace tooling.
- **Low cognitive overhead.** Any engineer familiar with Next.js App Router can navigate and contribute to this project immediately.

**Honest trade-offs:**
- **Boundaries are convention-based, not tooling-enforced.** Nothing structurally prevents a developer from importing a `lib/markdown` function directly into a `components/ui` file, creating unintended coupling. This requires code review discipline to maintain.
- **Cannot independently version or publish internal modules.** If `src/lib/` utilities are ever needed in a completely separate project, they cannot be consumed as an npm package without extracting them to a separate repo. This is acceptable for the current scope.
- **Scales to a point.** If this project grows beyond ~50 routes and the `src/` directory becomes unwieldy, migrating to Option A is a viable — though costly — future exit path.

**Verdict:** Directly satisfies every hard constraint and all engineering goals at the appropriate level of complexity for this project's current and near-term scale.

---

### Option C: Astro with React Islands

Astro is a content-first static site framework with native MDX support, zero client-side JS by default, and React component integration via the Islands architecture.

**Why it was considered:**
- Purpose-built for content-heavy sites with mixed static and interactive content — a near-perfect description of a portfolio + blog.
- Exceptional build performance and Lighthouse scores out of the box.

**Why it was rejected:**
- **Requires a full framework migration.** The existing portfolio is entirely built on Next.js App Router with Tailwind. Migrating to Astro would require rewriting all existing pages and components.
- **React island model adds conceptual overhead.** Distinguishing between Astro components and React islands requires an additional mental model that is unnecessary given the portfolio is already on Next.js.
- **Team familiarity.** The existing ecosystem knowledge (Next.js, Tailwind, TypeScript) is a genuine asset that is not worth discarding.

**Verdict:** The better technology for a greenfield content site, but the migration cost outweighs the benefits given the existing Next.js investment.

---

## 3. Decision

**We adopt Option B: Modular Single Next.js Application.**

This is the right decision for this project at this time. It satisfies every hard constraint, achieves every engineering goal, and avoids over-engineering a solution for a problem (multi-team, multi-deployment) that does not exist here. The trade-offs accepted (convention-based boundaries, non-publishable internal modules) are well understood and appropriate for a single-author personal project.

---

## 4. Consequences

### Positive

- A developer can add a new section of the site (e.g., `/case-studies`) by creating a new folder under `src/app/`. No additional configuration required.
- Blog posts are co-located with the portfolio in `src/content/blog/`, meaning a single `git clone` gives a contributor the entire history of the website.
- Shared components (Navbar, Footer, ThemeProvider) render identically on every page with no reconciliation layer.

### Negative (Trade-offs Accepted)

- **Boundary discipline is a team responsibility.** Without workspace-level tooling, circular imports between `src/lib/` and `src/components/` are possible and must be caught in code review.
- **`src/lib/` is not independently publishable.** If a utility (e.g., the markdown parser) is needed elsewhere in the future, it must be extracted manually.
- **Architectural re-evaluation required at scale.** If the project grows significantly in scope (multiple independent sections with dedicated teams), this ADR should be revisited in favor of Option A.

### Follow-up Decisions Required

The following decisions are **not in scope for this ADR** but are directly triggered by it and must be addressed before blog implementation begins:

| ADR | Topic | Priority |
|---|---|---|
| ADR-0002 | Markdown / MDX parsing strategy (`gray-matter` + `next-mdx-remote` vs. `@next/mdx` vs. `contentlayer`) | High |
| ADR-0003 | Blog post frontmatter schema and content governance | Medium |
| ADR-0004 | Image optimization strategy for blog assets on GitHub Pages | Medium |

---

## 5. References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Static Export (`output: 'export'`)](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Turbopack vs. Webpack in Next.js 16](https://nextjs.org/blog/turbopack-for-development-stable)
- [Turborepo + GitHub Pages Deployment Limitations](https://turbo.build/repo/docs/core-concepts/monorepos)
- [Architecture Decision Records – Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
