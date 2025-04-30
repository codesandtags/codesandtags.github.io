'use client'
import React from 'react'

import { Flex, Text, Heading } from '@radix-ui/themes'

import { Github, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'

import styles from './Hero.module.css'
import Link from 'next/link'

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
            src="/img/profile-v1.webp"
            alt="Edwin Torres"
            width={192}
            height={192}
            className="mx-auto mb-8 rounded-full object-cover"
            placeholder="blur"
            blurDataURL="/img/profile-v2-blur.webp"
          />

          <Heading as="h1" my={'4'} size={'8'} color="tomato">
            Edwin Torres
          </Heading>
          <Flex direction="column" gap="4" className="w-1/2 mx-auto">
            <Text>
              👋 Hi there! I am a{' '}
              <strong className="text-foreground">lifelong-learner</strong>,
              software engineer, and advocate for ultralearning. My expertise
              spans <strong className="text-foreground">Web Development</strong>
              , and{' '}
              <strong className="text-foreground">Software Architecture</strong>
              .
            </Text>
            <div className="flex justify-center space-x-4">
              <Link
                href="https://github.com/codesandtags"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/etcode/"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://www.youtube.com/@codesandtags"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Youtube size={24} />
              </Link>
            </div>
          </Flex>

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
