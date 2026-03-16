'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { footballApi } from '@/services/footballApi'
import { StandingsTable } from '@/components/standings/StandingsTable'
import { Navigation } from '@/components/navigation/Navigation'

export default function StandingsPage() {
  const [selectedLeague, setSelectedLeague] = useState(39) // Default to Premier League
  
  const { data: leagues } = useQuery({
    queryKey: ['leagues'],
    queryFn: () => footballApi.getLeagues(),
  })

  const { data: standings, isLoading, error } = useQuery({
    queryKey: ['standings', selectedLeague],
    queryFn: () => footballApi.getStandings(selectedLeague),
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
        <div className="w-full">
          {/* Page Header */}
          <header className="mb-8 lg:mb-12">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 lg:mb-3 text-white leading-tight">
                League Standings
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-stadium-muted max-w-3xl mx-auto lg:mx-0">
                Current season tables and rankings from top leagues
              </p>
            </div>
          </header>

          {/* League Selector */}
          <section className="mb-8 lg:mb-12" aria-labelledby="league-selector-heading">
            <h2 id="league-selector-heading" className="sr-only">Select League</h2>
            <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stadium-green/20 rounded-lg flex items-center justify-center">
                    <span className="text-stadium-green font-bold text-sm">EPL</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {leagues?.find(l => l.id === selectedLeague)?.name || 'Select League'}
                    </h3>
                    <p className="text-sm text-stadium-muted">
                      {leagues?.find(l => l.id === selectedLeague)?.country || 'Choose a league'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {leagues?.map((league) => (
                    <button
                      key={league.id}
                      onClick={() => setSelectedLeague(league.id)}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-stadium-green
                        ${selectedLeague === league.id 
                          ? 'bg-stadium-green text-white neon-glow shadow-glass' 
                          : 'glass-morphism-hover text-stadium-muted hover:text-white'
                        }
                      `}
                      aria-pressed={selectedLeague === league.id}
                    >
                      {league.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Standings Table */}
          <section aria-labelledby="standings-heading">
            <h2 id="standings-heading" className="sr-only">League Standings Table</h2>
            <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 glass-morphism rounded-xl skeleton" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400 font-medium">Failed to load standings. Please try again.</p>
                </div>
              ) : standings ? (
                <StandingsTable standings={standings} />
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
