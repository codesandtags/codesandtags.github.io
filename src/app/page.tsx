import type { Metadata } from 'next'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/ui/Hero'
import FeaturedWork from '@/components/ui/FeaturedWork'
import ContactSection from '@/components/ui/ContactSection'

export const metadata: Metadata = {
  title: 'Edwin Torres - Principal Full-Stack Engineer & Software Architect',
  description:
    'Edwin Torres is a Principal Full-Stack Engineer at Questrade, Software Architect, and advocate for ultralearning. Expert in React, Angular, Next.js, TypeScript, and Micro Frontend Architecture. Based in Toronto, Canada.',
  keywords: [
    'Edwin Torres',
    'Principal Full-Stack Engineer',
    'Software Architect',
    'React Developer',
    'Angular Developer',
    'Next.js',
    'TypeScript',
    'Micro Frontend',
    'Questrade',
    'Toronto Developer',
    'Ultralearning',
    'Web Development',
    'codesandtags',
  ],
  openGraph: {
    title: 'Edwin Torres - Principal Full-Stack Engineer & Software Architect',
    description:
      'Edwin Torres is a Principal Full-Stack Engineer at Questrade, Software Architect, and advocate for ultralearning. Expert in React, Angular, Next.js, TypeScript, and Micro Frontend Architecture.',
    url: 'https://codesandtags.github.io',
    images: [
      {
        url: '/img/profile-v1.webp',
        width: 1200,
        height: 630,
        alt: 'Edwin Torres - Principal Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    title: 'Edwin Torres - Principal Full-Stack Engineer & Software Architect',
    description:
      'Principal Full-Stack Engineer at Questrade, Software Architect, and advocate for ultralearning. Expert in React, Angular, Next.js, TypeScript.',
    images: ['/img/profile-v1.webp'],
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ContactSection />
      <Footer />
    </>
  )
}
