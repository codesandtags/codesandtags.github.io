import React from 'react'
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://github.com/codesandtags"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/etcode/"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.youtube.com/@codesandtags"
            className="text-foreground hover:text-primary transition-colors"
          >
            <Youtube size={24} />
          </a>
        </div>

        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Codes and Tags. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
