import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { getAllPosts } from '@/lib/markdown'
import BlogList from '@/components/ui/BlogList'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on software architecture, engineering leadership, and ultralearning by Edwin Torres — Principal Full-Stack Engineer based in Toronto.',
  openGraph: {
    type: 'website',
    title: 'Blog | codesandtags',
    description:
      'Thoughts on software architecture, engineering leadership, and ultralearning by Edwin Torres.',
    url: 'https://codesandtags.github.io/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | codesandtags',
    description:
      'Thoughts on software architecture, engineering leadership, and ultralearning by Edwin Torres.',
    creator: '@codesandtags',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const allTags = [...new Set(posts.flatMap((p) => p.frontmatter.tags))].sort()

  return (
    <>
      <div className="min-h-screen">
        {/* Hero header */}
        <section className="relative border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-20 max-w-6xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <BookOpen className="h-4 w-4" />
                Writing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Thoughts on software architecture, engineering leadership, and
                the pursuit of ultralearning.{' '}
                <span className="text-foreground font-medium">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'}{' '}
                  published.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Post listing */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <BlogList posts={posts} allTags={allTags} />
        </section>
      </div>

      <Footer />
    </>
  )
}
