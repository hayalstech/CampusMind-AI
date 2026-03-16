'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { footballApi } from '@/services/footballApi'
import { Trophy, ChevronDown } from 'lucide-react'

export function LeagueNavigation() {
  const [selectedLeague, setSelectedLeague] = useState(39) // Default to Premier League
  
  const { data: leagues } = useQuery({
    queryKey: ['leagues'],
    queryFn: () => footballApi.getLeagues(),
  })

  const selectedLeagueData = leagues?.find(league => league.id === selectedLeague)

  return (
    <div className="sticky top-0 z-50 nav-sticky animate-slide-down">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-morphism rounded-xl p-4 mb-6 border border-stadium-glass-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-stadium-green animate-glow" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedLeagueData?.name || 'Select League'}
                </h2>
                <p className="text-sm text-stadium-muted">
                  {selectedLeagueData?.country || 'Choose a league'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-2">
                {leagues?.slice(0, 4).map((league) => (
                  <button
                    key={league.id}
                    onClick={() => setSelectedLeague(league.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${selectedLeague === league.id 
                        ? 'bg-stadium-green text-white neon-glow' 
                        : 'glass-morphism-hover text-stadium-muted hover:text-white'
                      }
                    `}
                  >
                    {league.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              
              <div className="md:hidden">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(Number(e.target.value))}
                  className="glass-morphism text-white px-3 py-2 rounded-lg border border-stadium-glass-border focus:border-stadium-green focus:outline-none bg-stadium-dark/50"
                >
                  {leagues?.map((league) => (
                    <option key={league.id} value={league.id} className="bg-stadium-dark">
                      {league.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
