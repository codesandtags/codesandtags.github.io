import type { BlogPostFrontmatter } from '@/types/blog'

/**
 * Build-time frontmatter validator (ADR-0003 §2.3).
 *
 * Throws a descriptive Error if any required field is missing or empty,
 * aborting the Next.js build before a broken page reaches production.
 *
 * @param slug  - The post slug (derived from filename). Used in error messages.
 * @param data  - Raw parsed YAML data from the frontmatter block.
 * @returns     The same data cast to BlogPostFrontmatter after all checks pass.
 */
export function validateFrontmatter(
  slug: string,
  data: Record<string, unknown>
): BlogPostFrontmatter {
  const required = ['title', 'description', 'tags', 'date', 'draft'] as const

  for (const field of required) {
    const value = data[field]
    if (value === undefined || value === null || value === '') {
      throw new Error(
        `[Blog] Post "${slug}" is missing required frontmatter field: "${field}". Build aborted.`
      )
    }
  }

  if (!Array.isArray(data.tags) || (data.tags as unknown[]).length === 0) {
    throw new Error(
      `[Blog] Post "${slug}" must have at least one tag. Build aborted.`
    )
  }

  if (data.heroImage && !data.heroImageAlt) {
    throw new Error(
      `[Blog] Post "${slug}" has a heroImage but is missing heroImageAlt (required for accessibility). Build aborted.`
    )
  }

  return data as unknown as BlogPostFrontmatter
}
