'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Trophy, Table2, Star } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Matches', icon: Trophy, ariaLabel: 'View football matches' },
    { href: '/standings', label: 'Standings', icon: Table2, ariaLabel: 'View league standings' },
    { href: '/favorites', label: 'Favorites', icon: Star, ariaLabel: 'View favorite teams' },
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 glass-morphism border-t border-stadium-glass-border md:relative md:border-t-0 md:border-b md:bottom-auto z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around md:justify-between py-3 md:py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="hidden md:flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-stadium-green rounded-lg"
            aria-label="PitchPulse home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-stadium-green to-emerald-500 rounded-xl flex items-center justify-center shadow-glass group-hover:shadow-glass-lg transition-all">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              PitchPulse
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-1 md:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const isFavorites = item.href === '/favorites'
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col md:flex-row items-center gap-2 px-3 md:px-4 py-3 md:py-2 rounded-xl transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-stadium-green
                    ${isActive 
                      ? 'text-white bg-stadium-green/20 border border-stadium-green/30 neon-glow' 
                      : 'text-stadium-muted hover:text-white hover:glass-morphism'
                    }
                  `}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isFavorites && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-stadium-green rounded-full animate-pulse-emerald" aria-hidden="true" />
                  )}
                  
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce-subtle' : ''}`} />
                    {isActive && (
                      <div className="absolute inset-0 bg-stadium-green/20 rounded-full animate-pulse-emerald" aria-hidden="true" />
                    )}
                  </div>
                  
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-stadium-green rounded-full" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden">
            <Link 
              href="/" 
              className="w-8 h-8 bg-gradient-to-br from-stadium-green to-emerald-500 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-stadium-green rounded"
              aria-label="PitchPulse home"
            >
              <Trophy className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
