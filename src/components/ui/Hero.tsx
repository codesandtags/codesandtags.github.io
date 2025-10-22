'use client'
import React from 'react'
import {
  Github,
  Linkedin,
  Youtube,
  Mail,
  ArrowRight,
  Calendar,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './Hero.module.css'

export default function Hero() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  return (
    <div
      className={`relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-24 ${styles.beforeGradient}`}
      onMouseMove={handleMouseMove}
      // eslint-disable-next-line
      style={
        {
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Image
            src="/img/profile-v1.webp"
            alt="Edwin Torres"
            width={192}
            height={192}
            className="mx-auto mb-6 sm:mb-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover"
            placeholder="blur"
            blurDataURL="/img/profile-v2-blur.webp"
          />

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Edwin Torres
          </h1>
          <p className="mt-4 mb-6 sm:mt-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0">
            👋 Hi there! I am a{' '}
            <strong className="text-foreground">lifelong-learner</strong>,
            software engineer, and advocate for ultralearning. My expertise
            spans <strong className="text-foreground">Web Development</strong>,{' '}
            and{' '}
            <strong className="text-foreground">Software Architecture</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://calendly.com/codesandtags"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all text-lg"
            >
              <Calendar className="h-5 w-5" />
              Let's Talk
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-lg font-medium leading-6 text-foreground hover:text-primary transition-colors"
            >
              View My Work
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 sm:space-x-8">
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
            <a
              href="mailto:codesandtags@gmail.com"
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Email Contact"
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>

          {/* Availability Status: Commented until January 2026 */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/20 px-4 py-2 text-sm font-medium text-green-800 dark:text-green-200">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              Available for talks and consulting
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
