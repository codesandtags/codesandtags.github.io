import type { Metadata } from 'next'
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
  title: 'Codes and Tags',
  description: 'Domina el desarrollo Frontend',
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

      <body
        className={`${poppins.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground pt-12">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
