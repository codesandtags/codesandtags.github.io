import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Inter } from 'next/font/google'

import Navbar from '@/components/ui/Navbar'

import './globals.css'

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
