'use client'

import { Match } from '@/types/football'
import Link from 'next/link'
import { Radio, Clock, CheckCircle, PauseCircle, Star, TrendingUp, Users } from 'lucide-react'
import { useFavoritesStore } from '@/store/favorites'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  
  const isHomeFavorite = isFavorite(match.homeTeam.id)
  const isAwayFavorite = isFavorite(match.awayTeam.id)
  
  const getStatusBadge = () => {
    switch (match.status) {
      case 'LIVE':
        return (
          <div className="flex items-center gap-2 bg-stadium-green/20 px-3 py-1 rounded-full border border-stadium-green/30">
            <div className="relative">
              <Radio className="w-4 h-4 text-stadium-green" />
              <div className="absolute inset-0 live-indicator" />
            </div>
            <span className="text-stadium-green font-bold text-sm animate-pulse-emerald">
              {match.time}
            </span>
          </div>
        )
      case 'FINISHED':
        return (
          <div className="flex items-center gap-2 bg-stadium-muted/20 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-stadium-muted" />
            <span className="text-stadium-muted text-sm font-medium">FT</span>
          </div>
        )
      case 'PAUSED':
        return (
          <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
            <PauseCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">HT</span>
          </div>
        )
      case 'SCHEDULED':
        return (
          <div className="flex items-center gap-2 bg-stadium-muted/20 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-stadium-muted" />
            <span className="text-stadium-muted text-sm font-medium">{match.time}</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Link href={`/match/${match.id}`}>
      <div className="glass-morphism-hover match-card-hover rounded-2xl p-6 cursor-pointer border border-stadium-glass-border relative overflow-hidden group">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* League Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-stadium-green rounded-full animate-pulse-fast" />
            <span className="text-xs text-stadium-muted font-medium uppercase tracking-wider">
              {match.league.name}
            </span>
          </div>
          {getStatusBadge()}
        </div>
        
        {/* Teams & Score */}
        <div className="flex items-center justify-between relative z-10">
          {/* Home Team */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(match.homeTeam.id)
              }}
              className={`
                p-2 rounded-full transition-all duration-300
                ${isHomeFavorite 
                  ? 'bg-yellow-500/20 text-yellow-400 neon-glow' 
                  : 'text-stadium-muted hover:text-yellow-400 hover:bg-yellow-500/10'
                }
              `}
            >
              <Star className={`w-5 h-5 ${isHomeFavorite ? 'fill-current animate-bounce-subtle' : ''}`} />
            </button>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-stadium-navy to-stadium-dark rounded-full flex items-center justify-center text-lg font-bold border-2 border-stadium-glass-border">
                {match.homeTeam.name.charAt(0)}
              </div>
              <span className={`font-bold text-sm text-center transition-colors ${isHomeFavorite ? 'text-stadium-green' : 'text-white'}`}>
                {match.homeTeam.name}
              </span>
            </div>
          </div>
          
          {/* Score */}
          <div className="px-6 py-3 glass-morphism rounded-xl border border-stadium-glass-border">
            <div className="text-3xl font-bold text-center mb-1">
              <span className={match.status === 'LIVE' ? 'text-stadium-green animate-pulse-emerald' : 'text-white'}>
                {match.score.home ?? '-'}
              </span>
              <span className="mx-2 text-stadium-muted">:</span>
              <span className={match.status === 'LIVE' ? 'text-stadium-green animate-pulse-emerald' : 'text-white'}>
                {match.score.away ?? '-'}
              </span>
            </div>
            {match.status === 'LIVE' && (
              <div className="text-xs text-stadium-muted text-center flex items-center justify-center gap-1">
                <div className="w-1 h-1 bg-stadium-green rounded-full animate-pulse-fast" />
                LIVE
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="flex flex-col items-center gap-2">
              <span className={`font-bold text-sm text-center transition-colors ${isAwayFavorite ? 'text-stadium-green' : 'text-white'}`}>
                {match.awayTeam.name}
              </span>
              <div className="w-12 h-12 bg-gradient-to-br from-stadium-navy to-stadium-dark rounded-full flex items-center justify-center text-lg font-bold border-2 border-stadium-glass-border">
                {match.awayTeam.name.charAt(0)}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(match.awayTeam.id)
              }}
              className={`
                p-2 rounded-full transition-all duration-300
                ${isAwayFavorite 
                  ? 'bg-yellow-500/20 text-yellow-400 neon-glow' 
                  : 'text-stadium-muted hover:text-yellow-400 hover:bg-yellow-500/10'
                }
              `}
            >
              <Star className={`w-5 h-5 ${isAwayFavorite ? 'fill-current animate-bounce-subtle' : ''}`} />
            </button>
          </div>
        </div>

        {/* Match Stats Preview (for live matches) */}
        {match.status === 'LIVE' && match.statistics && (
          <div className="mt-4 pt-4 border-t border-stadium-glass-border relative z-10">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-stadium-muted" />
                <span className="text-stadium-muted">
                  {match.statistics.possession.home}% - {match.statistics.possession.away}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-stadium-muted" />
                <span className="text-stadium-muted">
                  {match.statistics.shotsOnTarget.home} - {match.statistics.shotsOnTarget.away}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
