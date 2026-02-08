import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinguaLive - Learn Languages with Real-World Vision',
  description: 'Point your camera at any object and learn its translation, pronunciation, and cultural context with interactive conversation practice. Learn languages like never before.',
  generator: 'v0.app',
  icons: {
    icon: '/mascot.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#164B8C',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
