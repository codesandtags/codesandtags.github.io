# ADR 0001: Monorepo Strategy for Blog Integration and Portfolio Consolidation

## Status

**Proposed**

## Context

We are consolidating the legacy personal blog ([codesandtags/blog](https://github.com/codesandtags/blog)) and the main portfolio website (`codesandtags.github.io`) into a single repository to adopt a monorepo structure.

The target architecture must support the following engineering goals:
1.  **UI/UX Consistency**: Shared design language (colors, fonts, layout, themes) across both portfolio and blog.
2.  **Reusability of UI Components**: Standardized, reusable UI components (buttons, navbars, cards, badges) without duplicate code.
3.  **Ease of Route Expansion**: Simple creation of new pages and dynamic paths (e.g., dynamic blog post slugs).
4.  **Coding Guidelines Consistency**: Shared linting (`eslint`), formatting (`prettier`), and typescript configurations.
5.  **Ability to Create Reusable Libs**: Modular code separation allowing internal libraries (e.g. markdown parsers, utility functions, shared types) to be isolated and reused.
6.  **Code Splitting**: Dynamic bundling to ensure the blog's code/assets are only loaded when users navigate to `/blog` routes.
7.  **Fast Builds**: Quick compilation and developer loop (using Next.js 16 and Turbopack).
8.  **Deployment Constraint**: The application must deploy statically (`next export`) to GitHub Pages under a single custom domain (`codesandtags.io`).

We evaluated two architectural patterns to meet these goals:

### Option 1: Multi-package Workspace Monorepo (using npm Workspaces / Turborepo)
*   **Structure**: Separate apps (`apps/portfolio`, `apps/blog`) and local packages (`packages/ui`, `packages/utils`, `packages/config`).
*   **Pros**: Complete isolation of configurations and application code.
*   **Cons**: Extremely complex deployment to a single static host like GitHub Pages, since GitHub Pages can only serve one static directory per repo. Running and coordinating builds across workspaces introduces significant build latency and configuration overhead.

### Option 2: Modular Single-Project Monorepo (using Next.js & TypeScript Path Aliases)
*   **Structure**: A single Next.js project with modular directories. Internal "reusable libs" are placed under `src/lib/` or `src/packages/` and accessed using TypeScript path aliases (e.g., `@/lib/markdown` or `@/packages/ui-blocks`).
*   **Pros**: Native support for static export (`out/` folder is easily served by GitHub Pages), out-of-the-box code splitting by Next.js App Router, fast builds with Next.js Turbopack, and zero multi-workspace tooling overhead.
*   **Cons**: Code boundaries are enforced via conventions and TypeScript configs rather than strict package boundaries.

---

## Decision

We will adopt **Option 2: Modular Single-Project Monorepo**.

This approach provides a pragmatic, robust, and low-overhead solution that addresses every requirement:

| Requirement | Option 2 (Modular Next.js Monorepo) Implementation |
| :--- | :--- |
| **UI/UX Consistency** | All routes share the root `globals.css`, global Tailwind config, and standard layout, ensuring unified styling. |
| **Reusability of UI Components** | Shared UI components are stored in `src/components/ui/` and imported globally. |
| **Dynamic Routes** | Creating new dynamic routes is as simple as creating standard folder paths (e.g., `src/app/blog/[slug]/page.tsx`). |
| **Guidelines Consistency** | Single root configuration for ESLint, TypeScript, and Prettier applies to all codebase directories. |
| **Reusable Libs** | Internal logical modules are organized under `src/lib/` (e.g., `src/lib/markdown/` for parsing posts) and configured with path aliases in `tsconfig.json`. |
| **Code Splitting** | Next.js App Router automatically code-splits code at page boundaries, only downloading resources for the active route. |
| **Fast Builds** | Next.js 16 leverages Turbopack for extremely fast HMR (Hot Module Replacement) and build pipelines. |
| **Deployment** | Out-of-the-box support for `output: 'export'` targeting GitHub Pages. |

---

## Consequences

*   **Folder Structure**: The project folder structure will adapt to:
    ```
    ├── docs/
    │   └── adrs/              # Architecture Decision Records
    ├── src/
    │   ├── app/               # Application routes (portfolio & blog pages)
    │   ├── components/        # Reusable UI component directories
    │   ├── lib/               # Internal logical libraries (path-aliased)
    │   │   ├── markdown/      # MDX/Markdown processing library
    │   │   └── utils.ts       # Shared utility helpers
    │   └── types/             # Shared typescript definitions
    ```
*   **Path Aliases**: We will maintain clear imports using path aliases:
    *   `@/components/*` -> reusable UI components
    *   `@/lib/*` -> modular libraries
    *   `@/types/*` -> shared TypeScript typings
*   **Conventions**: We must enforce structural cleanliness during code reviews to keep packages under `src/lib/` modular and free from circular dependencies.
