'use client'
import React from 'react'
import Image from 'next/image'

import { Github } from 'lucide-react'
// import { useTheme } from './ThemeProvider'
import { Badge } from '@/components/ui/badge'
import { MenuItem } from '@/types/menu'
import Link from 'next/link'

// Define the menu items array
const menuItems: MenuItem[] = [
  {
    name: 'Retos',
    href: '/challenges',
    isVisible: false,
  },
  {
    name: 'Cursos',
    href: '/courses',
    isVisible: false,
  },
  {
    name: 'Blog',
    href: '/blog',
    isVisible: true,
    isExternal: true,
  },
  {
    name: 'Projects',
    href: '/projects',
    isVisible: true,
    isExternal: false,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: <Github className="h-5 w-5" />,
    isVisible: false,
  },
]

export default function Navbar() {
  // const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/img/codesandtags.png"
                alt="Codes and Tags"
                width={32}
                height={32}
              />
              <span className="ml-2 text-xl font-bold">Codes and Tags</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                BETA
              </Badge>
            </div>
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems
              .filter((item) => item.isVisible)
              .map((item) =>
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.icon && item.icon}
                    {!item.icon && item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.icon && item.icon}
                    {!item.icon && item.name}
                  </Link>
                )
              )}
            {/* Hide theme toggle for now
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
