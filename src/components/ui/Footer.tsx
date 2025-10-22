import React from 'react'
import { Github, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:justify-center md:space-y-0 md:space-x-8">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/codesandtags"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/etcode/"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.youtube.com/@codesandtags"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>

          {/* Copyright Text */}
          <div className="text-center">
            <p className="text-xs sm:text-sm leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Codes and Tags. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
