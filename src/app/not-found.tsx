import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      {/* Alien/Space Theme Animation Placeholder */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <Rocket className="relative w-32 h-32 text-primary animate-bounce duration-[3000ms]" />
      </div>

      <h1 className="text-4xl font-bold mb-2">Got lost in space?</h1>
      <div className="text-6xl font-black text-primary/10 absolute -z-10 select-none">
        404
      </div>

      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Looks like you&apos;re lost in the vastness of <br/>the <span className="text-primary">Codes and Tags</span> universe.
      </p>

      <Button asChild size="lg" className="gap-2">
        <Link href="/">
          <Home className="w-4 h-4" />
          Back to Earth
        </Link>
      </Button>
    </div>
  )
}
