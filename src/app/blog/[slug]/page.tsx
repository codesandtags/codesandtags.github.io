import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import type { BlogPostFrontmatter } from '@/types/blog'
import Footer from '@/components/ui/Footer'

type Props = {
  params: Promise<{ slug: string }>
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

// ── SEO metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return {}

  const { title, description, heroImage, date, updatedAt, tags } =
    post.frontmatter

  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `https://codesandtags.github.io/blog/${slug}`,
      publishedTime: date,
      modifiedTime: updatedAt,
      authors: ['Edwin Torres'],
      tags,
      images: heroImage
        ? [{ url: heroImage, width: 1200, height: 630, alt: title }]
        : [{ url: '/img/profile-v1.webp', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: heroImage ? [heroImage] : ['/img/profile-v1.webp'],
      creator: '@codesandtags',
    },
  }
}

// ── Page component ────────────────────────────────────────────────────────────

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  // Fetch post metadata — throws ENOENT if slug does not exist → notFound()
  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  // Dynamically import the compiled MDX module for rendering.
  // `@next/mdx` compiles every .mdx in src/content/blog/ into a React component
  // at build time. Since `generateStaticParams` enumerates all slugs, Next.js
  // knows exactly which modules to pre-render.
  let PostContent: React.ComponentType
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`)
    PostContent = mod.default as React.ComponentType
  } catch {
    notFound()
  }

  const {
    title,
    description,
    date,
    updatedAt,
    tags,
    heroImage,
    heroImageAlt,
    author = 'Edwin Torres',
    featured,
  } = post.frontmatter as BlogPostFrontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const formattedUpdatedAt = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null

  return (
    <>
      <div className="min-h-screen">
        {/* Back navigation */}
        <div className="container mx-auto px-4 pt-8 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        <article className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Post header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                  ⭐ Featured
                </span>
              )}
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-colors duration-200"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
              {title}
            </h1>

            {/* Description / lede */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground pb-6 border-b border-border">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={date}>{formattedDate}</time>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
              {formattedUpdatedAt && (
                <span className="text-xs italic">
                  Updated {formattedUpdatedAt}
                </span>
              )}
            </div>
          </header>

          {/* Hero image */}
          {heroImage && (
            <div className="mb-10 rounded-xl overflow-hidden border border-border">
              <Image
                src={heroImage}
                alt={heroImageAlt ?? title}
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* MDX body — prose styles from @tailwindcss/typography */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-pre:bg-transparent prose-pre:p-0">
            <PostContent />
          </div>

          {/* Post footer */}
          <footer className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-colors duration-200"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              All posts
            </Link>
          </footer>
        </article>
      </div>

      <Footer />
    </>
  )
}
