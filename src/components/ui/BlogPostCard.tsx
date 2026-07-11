import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { slug, frontmatter, readingTime } = post
  const { title, description, date, tags, heroImage, heroImageAlt, featured } =
    frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Hero image thumbnail */}
      {heroImage ? (
        <Link href={`/blog/${slug}`} className="block overflow-hidden aspect-video">
          <Image
            src={heroImage}
            alt={heroImageAlt ?? title}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      ) : (
        <Link
          href={`/blog/${slug}`}
          className="block aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            📝
          </span>
        </Link>
      )}

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
              ⭐ Featured
            </span>
          )}
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`} className="block group/title">
          <h2 className="text-lg font-bold leading-snug text-foreground group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Meta: date + reading time */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readingTime}
          </span>
        </div>
      </div>
    </article>
  )
}
