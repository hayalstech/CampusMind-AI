import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SportOdds - Live Sports Betting',
  description: 'Live sports betting odds and matches across all major sports',
  keywords: 'sports betting, live odds, football, tennis, basketball, betting',
  authors: [{ name: 'SportOdds Team' }],
  openGraph: {
    title: 'SportOdds - Live Sports Betting',
    description: 'Live sports betting odds and matches across all major sports',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10b981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-stadium-darker text-white min-h-screen antialiased`}>
        <div className="relative min-h-screen flex flex-col">
          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-stadium-navy via-stadium-dark to-stadium-darker opacity-90" />
          
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-stadium-green/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stadium-green/3 rounded-full blur-3xl animate-rotate-slow" />
          </div>
          
          {/* Skip to main content for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-stadium-green text-white px-4 py-2 rounded">
            Skip to main content
          </a>
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
