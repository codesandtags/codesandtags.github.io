'use client'
import React from 'react'
import Image from 'next/image'

import { Github, Menu, X } from 'lucide-react'
import { MenuItem } from '@/types/menu'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './navigation-menu'

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
    name: 'What I use',
    href: '/what-i-use',
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
  // State to toggle mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo or site title (optional) */}
        <div className="text-xl font-bold">
          <Link href="/" className="flex justify-center items-center gap-2">
            <Image
              src="/img/codesandtags.png"
              alt="logo"
              width={40}
              height={40}
            />
            Codes and Tags
          </Link>
        </div>

        {/* Desktop navigation (visible at md+ breakpoints) */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="gap-4">
            {menuItems
              .filter((item) => item.isVisible)
              .map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="cursor-pointer hover:text-primary">
                      {item.icon ? item.icon : item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Hamburger button (visible on mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu (dropdown) - Only shown if mobileMenuOpen is true */}
      {mobileMenuOpen && (
        <div className="border-b md:hidden">
          <nav className="mx-auto flex flex-col space-y-2 px-4 py-2">
            {menuItems
              .filter((item) => item.isVisible)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-2 hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon ? item.icon : item.name}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </div>
  )
}
