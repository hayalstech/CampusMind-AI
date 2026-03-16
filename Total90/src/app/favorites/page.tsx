'use client'

import { useQuery } from '@tanstack/react-query'
import { footballApi } from '@/services/footballApi'
import { useFavoritesStore } from '@/store/favorites'
import { MatchCard } from '@/components/match/MatchCard'
import { Navigation } from '@/components/navigation/Navigation'
import { Star, Heart } from 'lucide-react'

export default function FavoritesPage() {
  const { favoriteTeams } = useFavoritesStore()
  
  const { data: allMatches } = useQuery({
    queryKey: ['matches', 'ALL'],
    queryFn: () => footballApi.getMatches('ALL'),
    refetchInterval: 60000,
  })

  // Filter matches that include favorite teams
  const favoriteMatches = allMatches?.filter(match => 
    favoriteTeams.includes(match.homeTeam.id) || 
    favoriteTeams.includes(match.awayTeam.id)
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
        <div className="w-full">
          {/* Page Header */}
          <header className="mb-8 lg:mb-12">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 lg:mb-3 text-white leading-tight flex items-center justify-center lg:justify-start gap-3">
                <Star className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 fill-current" />
                Your Favorites
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-stadium-muted max-w-3xl mx-auto lg:mx-0">
                {favoriteTeams.length} favorite {favoriteTeams.length === 1 ? 'team' : 'teams'} • Track your clubs here
              </p>
            </div>
          </header>

          {/* Favorite Matches */}
          <section aria-labelledby="favorites-heading">
            <h2 id="favorites-heading" className="sr-only">Favorite Team Matches</h2>
            <div className="space-y-4">
              {favoriteMatches && favoriteMatches.length > 0 ? (
                <>
                  <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border mb-6">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-400 fill-current" />
                      <h3 className="text-lg font-semibold text-white">
                        Matches Featuring Your Teams
                      </h3>
                      <span className="px-3 py-1 bg-stadium-green/20 text-stadium-green rounded-full text-sm font-bold">
                        {favoriteMatches.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {favoriteMatches.map((match, index) => (
                      <div 
                        key={match.id} 
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <MatchCard match={match} />
                      </div>
                    ))}
                  </div>
                </>
              ) : favoriteTeams.length > 0 ? (
                <div className="text-center py-16 glass-morphism rounded-2xl border border-stadium-glass-border">
                  <div className="w-20 h-20 bg-stadium-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-stadium-muted" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">No matches today</h3>
                  <p className="text-stadium-muted mb-6 max-w-md mx-auto">
                    Your favorite teams don't have any matches scheduled for today. 
                    Check back later for upcoming fixtures!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="px-6 py-3 bg-stadium-green text-white rounded-lg hover:bg-stadium-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-stadium-green"
                    >
                      View All Matches
                    </button>
                    <button
                      onClick={() => window.location.href = '/standings'}
                      className="px-6 py-3 glass-morphism text-white rounded-lg hover:glass-morphism-hover transition-colors focus:outline-none focus:ring-2 focus:ring-stadium-green"
                    >
                      View Standings
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 glass-morphism rounded-2xl border border-stadium-glass-border">
                  <div className="w-24 h-24 bg-stadium-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-12 h-12 text-stadium-muted" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">No Favorites Yet</h3>
                  <p className="text-stadium-muted mb-6 max-w-md mx-auto text-lg">
                    Start following your favorite teams to see their matches appear here!
                  </p>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <p className="text-stadium-muted text-sm">
                      <span className="font-medium">How to add favorites:</span>
                    </p>
                    <ol className="text-stadium-muted text-sm space-y-2 text-left">
                      <li>1. Go to the Matches page</li>
                      <li>2. Click the star icon next to any team</li>
                      <li>3. Their matches will appear here</li>
                    </ol>
                  </div>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-stadium-green text-white rounded-lg hover:bg-stadium-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-stadium-green mt-6"
                  >
                    Browse Matches
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
