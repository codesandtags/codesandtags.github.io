import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

/**
 * Root-level MDX component map required by @next/mdx.
 * Maps standard HTML elements rendered from MDX to styled React equivalents.
 * Applied globally to every .mdx file in the project.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use next/image for MDX since rehype-img-size injects width and height
    img: (props) => {
      // Extract properties
      const { src, alt, width, height, ...rest } = props
      
      // If width and height are provided by rehype-img-size, use next/image
      if (src && width && height) {
        return (
          <Image
            src={src}
            alt={alt ?? ''}
            width={typeof width === 'string' ? parseInt(width, 10) : width}
            height={typeof height === 'string' ? parseInt(height, 10) : height}
            style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
            {...rest}
          />
        )
      }
      
      // Fallback for external images or images without dimensions
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
          alt={alt ?? ''}
          {...rest}
        />
      )
    },
    // Replace <a> with Next.js <Link> for client-side navigation on internal links
    a: ({ href, children, ...props }) => (
      <Link href={href ?? '#'} {...props}>
        {children}
      </Link>
    ),
    // Custom pre for code highlighting
    pre: CodeBlock,
    // Spread any per-file or per-page component overrides last so they win
    ...components,
  }
}
