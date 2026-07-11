'use client'

import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import BlogPostCard from '@/components/ui/BlogPostCard'
import type { BlogPost } from '@/types/blog'

interface BlogListProps {
  posts: BlogPost[]
  allTags: string[]
}

/**
 * Client component that owns tag-filter state and renders the post grid.
 * Receives all posts from the server component (BlogPage) as serialisable props.
 */
export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      selectedTag
        ? posts.filter((p) => p.frontmatter.tags.includes(selectedTag))
        : posts,
    [posts, selectedTag]
  )

  return (
    <div className="space-y-8">
      {/* Tag filter pills */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by tag"
      >
        <button
          id="blog-tag-all"
          onClick={() => setSelectedTag(null)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
            ${
              selectedTag === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            }`}
          aria-pressed={selectedTag === null}
        >
          All posts
          <span className="text-xs opacity-70">({posts.length})</span>
        </button>

        {allTags.map((tag) => {
          const count = posts.filter((p) =>
            p.frontmatter.tags.includes(tag)
          ).length
          const isActive = selectedTag === tag

          return (
            <button
              key={tag}
              id={`blog-tag-${tag}`}
              onClick={() => setSelectedTag(isActive ? null : tag)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              aria-pressed={isActive}
            >
              {tag}
              <span className="text-xs opacity-70">({count})</span>
              {isActive && <X className="h-3 w-3" />}
            </button>
          )
        })}
      </div>

      {/* Results count */}
      {selectedTag && (
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <strong className="text-foreground">{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'post' : 'posts'} tagged{' '}
          <strong className="text-primary">&ldquo;{selectedTag}&rdquo;</strong>
        </p>
      )}

      {/* Post grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-muted-foreground">
            No posts found for &ldquo;{selectedTag}&rdquo;.
          </p>
          <button
            onClick={() => setSelectedTag(null)}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
