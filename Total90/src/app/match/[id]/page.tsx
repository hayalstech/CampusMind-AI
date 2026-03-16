'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { footballApi } from '@/services/footballApi'
import { MatchDetail } from '@/components/match/MatchDetail'
import { Navigation } from '@/components/navigation/Navigation'

export default function MatchPage() {
  const params = useParams()
  const matchId = parseInt(params.id as string, 10)

  const { data: match, isLoading, error } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => footballApi.getMatchById(matchId),
    refetchInterval: 60000, // Poll every 60 seconds for live matches
  })

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
          <div className="w-full">
            <div className="animate-fade-in space-y-6">
              <div className="h-12 glass-morphism rounded-xl skeleton" />
              <div className="h-48 glass-morphism rounded-2xl skeleton" />
              <div className="h-64 glass-morphism rounded-2xl skeleton" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
          <div className="w-full">
            <div className="text-center py-16 glass-morphism rounded-2xl border border-stadium-glass-border">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚽</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-white">Match Not Found</h2>
              <p className="text-stadium-muted mb-6 max-w-md mx-auto">
                The match you're looking for doesn't exist or has been removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 glass-morphism text-white rounded-lg hover:glass-morphism-hover transition-colors focus:outline-none focus:ring-2 focus:ring-stadium-green"
                >
                  Go Back
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-stadium-green text-white rounded-lg hover:bg-stadium-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-stadium-green"
                >
                  View All Matches
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
        <div className="w-full">
          <article className="animate-fade-in">
            <MatchDetail match={match} />
          </article>
        </div>
      </main>
    </div>
  )
}
