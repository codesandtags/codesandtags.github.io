'use client'
import React from 'react'
import { Github, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'

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
      className={`relative pt-48 pb-20 sm:pt-56 ${styles.beforeGradient}`}
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
            src="/img/profile-edwin.png"
            alt="Edwin Torres"
            width={192}
            height={192}
            className="mx-auto mb-8 rounded-full object-cover"
          />

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Edwin Torres
          </h1>
          <p className="mt-6 mb-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            👋 Hi there! I am a{' '}
            <strong className="text-foreground">lifelong-learner</strong>,
            software engineer, and advocate for ultralearning. My expertise
            spans <strong className="text-foreground">Web Development</strong>,{' '}
            and{' '}
            <strong className="text-foreground">Software Architecture</strong>.
          </p>
          <div className="flex justify-center space-x-4">
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
          {/* <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
              Charlemos
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
              Ver Projectos <ArrowRight className="h-4 w-4" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
