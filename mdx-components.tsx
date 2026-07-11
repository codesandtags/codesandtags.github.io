import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

/**
 * Root-level MDX component map required by @next/mdx.
 * Maps standard HTML elements rendered from MDX to styled React equivalents.
 * Applied globally to every .mdx file in the project.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use standard <img> for MDX since dimensions aren't statically known
    img: (props) => (
      <img
        style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
        {...props}
        alt={props.alt ?? ''}
      />
    ),
    // Replace <a> with Next.js <Link> for client-side navigation on internal links
    a: ({ href, children, ...props }) => (
      <Link href={href ?? '#'} {...props}>
        {children}
      </Link>
    ),
    // Spread any per-file or per-page component overrides last so they win
    ...components,
  }
}
