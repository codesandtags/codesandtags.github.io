import type { Metadata } from 'next'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/ui/Hero'
import FeaturedWork from '@/components/ui/FeaturedWork'
import ContactSection from '@/components/ui/ContactSection'

export const metadata: Metadata = {
  title: 'Edwin Torres - Senior Frontend Developer & Software Architect',
  description:
    'Edwin Torres is a Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning. Expert in React, Next.js, TypeScript, and Micro Frontend Architecture. Based in Toronto, Canada.',
  keywords: [
    'Edwin Torres',
    'Frontend Developer',
    'Software Architect',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Micro Frontend',
    'HelloFresh',
    'Toronto Developer',
    'Ultralearning',
    'Web Development',
    'codesandtags',
  ],
  openGraph: {
    title: 'Edwin Torres - Senior Frontend Developer & Software Architect',
    description:
      'Edwin Torres is a Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning. Expert in React, Next.js, TypeScript, and Micro Frontend Architecture.',
    url: 'https://codesandtags.github.io',
    images: [
      {
        url: '/img/profile-v1.webp',
        width: 1200,
        height: 630,
        alt: 'Edwin Torres - Senior Frontend Developer',
      },
    ],
  },
  twitter: {
    title: 'Edwin Torres - Senior Frontend Developer & Software Architect',
    description:
      'Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning. Expert in React, Next.js, TypeScript.',
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
