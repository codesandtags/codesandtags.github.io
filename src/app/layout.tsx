import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import localFont from 'next/font/local'

import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Inter } from 'next/font/google'

import Script from 'next/script'

import Navbar from '@/components/ui/Navbar'
import './globals.css'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'G-37QWK3HRDK'

const poppins = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'Edwin Torres - Senior Frontend Developer & Software Architect',
    template: '%s | Edwin Torres - codesandtags',
  },
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
    'Scotiabank',
    'Toronto Developer',
    'Ultralearning',
    'Web Development',
    'codesandtags',
  ],
  authors: [{ name: 'Edwin Torres', url: 'https://codesandtags.github.io' }],
  creator: 'Edwin Torres',
  publisher: 'codesandtags',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codesandtags.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codesandtags.github.io',
    title: 'Edwin Torres - Senior Frontend Developer & Software Architect',
    description:
      'Edwin Torres is a Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning. Expert in React, Next.js, TypeScript, and Micro Frontend Architecture.',
    siteName: 'codesandtags',
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
    card: 'summary_large_image',
    title: 'Edwin Torres - Senior Frontend Developer & Software Architect',
    description:
      'Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning. Expert in React, Next.js, TypeScript.',
    images: ['/img/profile-v1.webp'],
    creator: '@codesandtags',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      {/* Load the gtag.js library from Google Tag Manager */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialize gtag with your GA measurement ID */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}', {
              page_path: window.location.pathname,
            });
            `}
      </Script>

      {/* Structured Data (JSON-LD) */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Edwin Torres',
            alternateName: 'codesandtags',
            url: 'https://codesandtags.github.io',
            image: 'https://codesandtags.github.io/img/profile-v1.webp',
            description:
              'Senior Frontend Developer at HelloFresh, Software Architect, and advocate for ultralearning',
            jobTitle: 'Senior Frontend Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'HelloFresh',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Toronto',
              addressCountry: 'Canada',
            },
            sameAs: [
              'https://github.com/codesandtags',
              'https://www.linkedin.com/in/etcode/',
              'https://www.youtube.com/@codesandtags',
              'https://calendly.com/codesandtags',
            ],
            knowsAbout: [
              'React',
              'Next.js',
              'TypeScript',
              'Micro Frontend Architecture',
              'Web Development',
              'Software Architecture',
              'Ultralearning',
            ],
            alumniOf: 'Scotiabank',
            hasOccupation: {
              '@type': 'Occupation',
              name: 'Software Engineer',
              occupationLocation: {
                '@type': 'City',
                name: 'Toronto, Canada',
              },
            },
          }),
        }}
      />

      <body
        className={`${poppins.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1 pt-12">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
