# ADR 0004: Image Optimization Strategy for Blog Assets

| Field | Value |
|---|---|
| **ID** | ADR-0004 |
| **Status** | Proposed |
| **Date** | 2026-07-11 |
| **Author** | Edwin Torres ([@codesandtags](https://github.com/codesandtags)) |
| **Deciders** | Edwin Torres |
| **Depends On** | [ADR-0001](./0001-monorepo-strategy.md) — Modular Single Next.js Application |
| **Depends On** | [ADR-0002](./0002-mdx-content-pipeline.md) — MDX Content Pipeline |
| **Depends On** | [ADR-0003](./0003-blog-frontmatter-schema.md) — Blog Frontmatter Schema |

---

## 1. Context & Problem Statement

In the current Next.js (App Router) setup, standard markdown images (`![alt](/path.png)`) compiled via MDX are rendered as standard HTML `<img>` tags (as explicitly defined in `mdx-components.tsx`). 

While this works, it bypasses Next.js's built-in image optimization capabilities (`next/image`). This causes several issues:
1. **Performance Penalties**: Images are served in their original formats (e.g., heavy PNGs or JPEGs) instead of modern, highly-compressed formats like WebP or AVIF.
2. **Cumulative Layout Shift (CLS)**: Because the `<img>` tags lack explicit `width` and `height` attributes, the browser cannot reserve space for the image before it loads, resulting in page layout shifts.
3. **Missing Lazy Loading**: Images below the fold are loaded immediately, wasting bandwidth and hurting initial page load times (Largest Contentful Paint - LCP).

To utilize `next/image` within MDX, the component requires `width` and `height` attributes. However, standard markdown syntax does not support passing dimensions natively.

## 2. Considered Options

### Option 1: Require Authors to Use JSX `<Image>` Components
Instead of standard markdown syntax, authors would write raw JSX in their `.mdx` files:
```tsx
<Image src="/images/blog/my-post/diagram.png" alt="Diagram" width={800} height={600} />
```
* **Pros**: Explicit, fully leverages Next.js capabilities without extra build tooling.
* **Cons**: Breaks standard markdown portability. It introduces significant friction for authors who must manually find and type the dimensions for every image.

### Option 2: Build-time Extraction via Rehype Plugin (Recommended)
Use a rehype plugin (such as a custom plugin or `rehype-img-size`) to automatically calculate image dimensions at build time. 
During the MDX compilation phase, the plugin intercepts image nodes, reads the local file from the `public/` directory using the `image-size` library, and injects the `width` and `height` properties into the AST. The global `mdx-components.tsx` then receives these props and renders the Next.js `<Image>` component.
* **Pros**: Preserves clean, standard markdown syntax (`![alt](/path.png)`). Completely automates CLS prevention and format optimization.
* **Cons**: Adds a slight overhead to the build time. Only works out-of-the-box for local assets (which aligns perfectly with ADR-0003's asset scoping strategy).

### Option 3: Continue Using Standard `<img>` Tags
Keep the current implementation.
* **Pros**: Zero engineering effort. Highly portable.
* **Cons**: Unacceptable performance costs for an engineering portfolio that should demonstrate best practices (poor CWV scores).

---

## 3. Decision

We will proceed with **Option 2: Build-time Extraction via Rehype Plugin**.

This approach provides the best developer experience (standard markdown) while delivering the best user experience (optimized Next.js images). 

### Implementation Steps:
1. **Install Dependencies**: Introduce `image-size` to calculate image dimensions.
2. **Rehype Plugin**: Integrate a rehype plugin into the `@next/mdx` configuration in `next.config.ts`. The plugin will traverse the AST, identify `img` nodes with local paths, and attach `width` and `height` attributes based on the physical file dimensions in `public/`.
3. **Update `mdx-components.tsx`**: Modify the `img` mapping to use `next/image` instead of the standard `<img>` tag, spreading the auto-injected `width`, `height`, and `src` props.
4. **Hero Images**: Ensure that the `heroImage` rendered in the `[slug]/page.tsx` layout also utilizes the `<Image>` component, extracting dimensions similarly or using a `fill` layout strategy.

## 4. Consequences

### Positive
- **Improved Core Web Vitals**: Automatic prevention of CLS and improvement in LCP scores due to lazy loading and modern image formats (WebP/AVIF via Vercel's Edge Network).
- **Author Experience**: Writers can continue using standard markdown syntax `![alt](...)` without worrying about layout shifts or image compression.
- **Portability**: The `.mdx` files remain strictly compatible with any standard markdown parser if the blog is ever migrated to another stack.

### Negative
- **Build Complexity**: `next.config.ts` becomes slightly more complex. 
- **Turbopack Compatibility**: We must ensure that the chosen rehype plugin is strictly serializable or properly structured to be compatible with Next.js 16's Turbopack (as noted in `next.config.ts`).

---

## 5. References

- [Next.js Image Component Documentation](https://nextjs.org/docs/pages/api-reference/components/image)
- [rehype-img-size](https://github.com/ksoichiro/rehype-img-size)
- [image-size package](https://github.com/image-size/image-size)
