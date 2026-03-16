'use client'

import { useQuery } from '@tanstack/react-query'
import { footballApi } from '@/services/footballApi'
import { MatchCard } from './MatchCard'
import { useState } from 'react'
import { Radio, Filter, Activity } from 'lucide-react'

type FilterType = 'ALL' | 'LIVE' | 'FINISHED' | 'SCHEDULED'

export function MatchDay() {
  const [filter, setFilter] = useState<FilterType>('ALL')
  
  const { data: matches, isLoading, error } = useQuery({
    queryKey: ['matches', filter],
    queryFn: () => footballApi.getMatches(filter === 'ALL' ? undefined : filter),
    refetchInterval: filter === 'LIVE' || filter === 'ALL' ? 60000 : false, // Poll every 60s for live matches
    staleTime: 30000,
  })

  const filters: { key: FilterType; label: string; icon: React.ElementType }[] = [
    { key: 'ALL', label: 'All Matches', icon: Filter },
    { key: 'LIVE', label: 'Live', icon: Radio },
    { key: 'SCHEDULED', label: 'Scheduled', icon: Activity },
    { key: 'FINISHED', label: 'Finished', icon: Activity },
  ]

  const liveCount = matches?.filter(m => m.status === 'LIVE').length || 0

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <div key={f.key} className="h-12 w-32 glass-morphism rounded-full skeleton" />
          ))}
        </div>
        
        {/* Match Cards Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 glass-morphism rounded-2xl skeleton" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 glass-morphism rounded-2xl border border-stadium-glass-border">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Filter className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-400 font-medium">Failed to load matches</p>
        <p className="text-stadium-muted text-sm mt-2">Please check your connection and try again</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Filter Tabs */}
      <div className="glass-morphism rounded-2xl p-4 border border-stadium-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Match Filters</h3>
          {liveCount > 0 && (
            <div className="flex items-center gap-2 bg-stadium-green/20 px-3 py-1 rounded-full border border-stadium-green/30">
              <div className="w-2 h-2 bg-stadium-green rounded-full animate-pulse-emerald" />
              <span className="text-stadium-green font-bold text-sm">{liveCount} Live</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => {
            const Icon = f.icon
            const isActive = filter === f.key
            const count = f.key === 'LIVE' ? liveCount : 
                       f.key === 'ALL' ? matches?.length || 0 :
                       matches?.filter(m => m.status === f.key).length || 0
            
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap 
                  transition-all duration-300 relative overflow-hidden group
                  ${isActive 
                    ? 'bg-stadium-green text-white neon-glow shadow-glass' 
                    : 'glass-morphism-hover text-stadium-muted hover:text-white'
                  }
                `}
              >
                {f.key === 'LIVE' && (
                  <div className="relative">
                    <Icon className="w-4 h-4" />
                    <div className="absolute inset-0 live-indicator" />
                  </div>
                )}
                {f.key !== 'LIVE' && (
                  <Icon className="w-4 h-4" />
                )}
                <span>{f.label}</span>
                {count > 0 && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive ? 'bg-white/20 text-white' : 'bg-stadium-muted/20 text-stadium-muted'}
                  `}>
                    {count}
                  </span>
                )}
                
                {/* Shimmer effect on active tab */}
                {isActive && (
                  <div className="absolute inset-0 bg-shimmer opacity-30" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Match Count and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-stadium-muted">
            <span className="text-white font-bold">{matches?.length || 0}</span> matches found
          </p>
          {filter !== 'ALL' && (
            <button
              onClick={() => setFilter('ALL')}
              className="text-stadium-green hover:text-stadium-emerald text-sm font-medium transition-colors"
            >
              View All →
            </button>
          )}
        </div>
        
        {(filter === 'LIVE' || filter === 'ALL') && (
          <div className="flex items-center gap-2 text-xs text-stadium-green">
            <Activity className="w-3 h-3 animate-pulse-fast" />
            <span>Live updates every 60s</span>
          </div>
        )}
      </div>

      {/* Enhanced Match List */}
      <div className="space-y-4">
        {matches?.map((match, index) => (
          <div 
            key={match.id} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MatchCard match={match} />
          </div>
        ))}
        
        {matches?.length === 0 && (
          <div className="text-center py-16 glass-morphism rounded-2xl border border-stadium-glass-border">
            <div className="w-20 h-20 bg-stadium-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-stadium-muted" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-stadium-muted mb-4">
              {filter === 'LIVE' && 'No live matches at the moment'}
              {filter === 'SCHEDULED' && 'No scheduled matches for today'}
              {filter === 'FINISHED' && 'No finished matches yet'}
              {filter === 'ALL' && 'No matches available'}
            </p>
            {filter !== 'ALL' && (
              <button
                onClick={() => setFilter('ALL')}
                className="px-4 py-2 bg-stadium-green text-white rounded-lg hover:bg-stadium-emerald transition-colors"
              >
                View All Matches
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
