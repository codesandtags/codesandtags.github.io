# Agent Instructions & Project Guidelines (AGENTS.md)

Welcome, AI Agent! This file outlines the repository structure, code patterns, and constraints for **codesandtags.github.io**. Please read and adhere to these guidelines to maintain a clean, secure, and high-quality codebase.

---

## 1. Project Overview

*   **Owner**: [Edwin Torres](https://github.com/codesandtags)
*   **Project**: Personal website, portfolio, and blog (`codesandtags.github.io`).
*   **Target Monorepo Strategy**: This repository is transitioning into a monorepo structure. Previously, the blog existed as a separate repository ([codesandtags/blog](https://github.com/codesandtags/blog)). The goal is to integrate all blog posts, articles, and associated assets directly into this project to consolidate content.

### Tech Stack
*   **Framework**: Next.js (v16.x) utilizing the **App Router**
*   **Styling**: Tailwind CSS (v3.x) & PostCSS (v8.x)
*   **Language**: TypeScript (v5.x / v7.x compatibility)
*   **Deployment**: GitHub Pages / Static Exports
*   **Node.js Environment**: Managed via Volta (`node: 22.12.0`)

---

## 2. Directory Structure

Ensure you are familiar with the project layout before making changes:

```
.
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions quality gate (Lint, Type-check, Build)
├── public/                    # Static assets
└── src/
    ├── app/                   # App Router pages and layouts
    │   ├── experience/        # Experience route
    │   ├── projects/          # Projects route
    │   ├── talks/             # Talks route
    │   ├── what-i-use/        # Tech stack / setup route
    │   ├── layout.tsx         # Global layout
    │   └── page.tsx           # Home page
    ├── components/
    │   └── ui/                # UI components (e.g. Navbar, Footer, Hero, ThemeProvider)
    ├── lib/
    │   └── utils.ts           # Shared utilities (e.g. cn tailwind-merge helper)
    └── types/                 # Shared TypeScript interfaces
```

---

## 3. Core Development Rules

### Dependency Management & Security
1.  **Vulnerability Checks**: Always verify that additions or upgrades do not introduce security vulnerabilities. Run `npm audit` frequently.
2.  **Transitive Overrides**: If a sub-dependency (like `postcss` within `next`) reports a vulnerability and cannot be upgraded directly, use the `"overrides"` block in [package.json](file:///Users/etcode/Documents/codesandtags/code/codesandtags.github.io/package.json) to force secure resolution.
3.  **Strict Linting & Types**: Keep the build strict. Ensure `npm run lint` and `npm run type-check` pass successfully before proposing any commit or PR.

### Coding Style & Design
1.  **Modern React / TypeScript**: Use TypeScript strictly. Define components using functional syntax. Avoid `any` where possible.
2.  **Tailwind CSS**: Follow mobile-first design principles. Ensure high quality responsive layouts.
3.  **Rich Aesthetics**: The website should showcase professional design aesthetics—vibrant but balanced color palettes, appropriate typography, smooth hover states, and clear interactive feedback.
4.  **No Placeholders**: Never commit raw placeholders. If an image or media is needed, ensure it is fully generated or correctly placed in the `public/` directory.

---

## 4. Blog Integration Workflow (Monorepo Transition)

When working on integrating the legacy blog from [codesandtags/blog](https://github.com/codesandtags/blog):
1.  **Content Migration**: Import markdown/MDX articles into a dedicated content directory or subfolder (e.g. `src/content/blog` or directly `src/app/blog/[slug]`).
2.  **Asset Management**: Put any static images/assets referenced by the blog posts inside the `public/images/blog/` directory.
3.  **Route Setup**: Create a `/blog` list route and a dynamic `/blog/[slug]` display route, keeping it SEO-friendly and consistent with the global theme.
4.  **SEO Guidelines**: Ensure every blog page renders metadata dynamically using Next.js's `generateMetadata` function (e.g., meta title, description, open graph tags).

---

## 5. Git and CI/CD Workflow

1.  **Branching Strategy**: 
    *   Create separate feature branches from `main` (e.g. `feature/integrate-blog-posts` or `bugfix/fix-mobile-navbar`).
2.  **Pre-Commit Verification**:
    Before finalizing any work, run the quality gates locally:
    ```bash
    npm run lint
    npm run type-check
    npm run build
    ```
3.  **Pull Requests**:
    *   Create descriptive pull requests detailing the changes.
    *   Ensure all CI quality gate checks in [ci.yml](file:///Users/etcode/Documents/codesandtags/code/codesandtags.github.io/.github/workflows/ci.yml) pass.
