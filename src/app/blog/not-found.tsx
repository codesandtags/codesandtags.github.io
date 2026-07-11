import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 p-4 rounded-full bg-primary/10 border border-primary/20">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-3">
        Post not found
      </h1>

      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        The post you are looking for might have been removed, renamed, or never
        existed.
      </p>

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Blog
      </Link>
    </div>
  )
}
