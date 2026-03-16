'use client'

import { Match } from '@/types/football'
import { ArrowLeft, Clock, Target, Users, Zap, Trophy, Activity } from 'lucide-react'
import Link from 'next/link'
import { ProgressBar } from './ProgressBar'

interface MatchDetailProps {
  match: Match
}

export function MatchDetail({ match }: MatchDetailProps) {
  const getStatusDisplay = () => {
    switch (match.status) {
      case 'LIVE':
        return (
          <div className="flex items-center gap-3 bg-stadium-green/20 px-4 py-2 rounded-full border border-stadium-green/30 neon-glow">
            <div className="relative">
              <div className="w-4 h-4 bg-stadium-green rounded-full animate-pulse-emerald" />
              <div className="absolute inset-0 bg-stadium-green rounded-full animate-pulse-emerald opacity-50" />
            </div>
            <span className="text-stadium-green font-bold">LIVE {match.time}</span>
          </div>
        )
      case 'FINISHED':
        return (
          <div className="flex items-center gap-2 bg-stadium-muted/20 px-4 py-2 rounded-full">
            <Trophy className="w-4 h-4 text-stadium-muted" />
            <span className="text-stadium-muted font-medium">Full Time</span>
          </div>
        )
      case 'PAUSED':
        return (
          <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Half Time</span>
          </div>
        )
      case 'SCHEDULED':
        return (
          <div className="flex items-center gap-2 bg-stadium-muted/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-stadium-muted" />
            <span className="text-stadium-muted font-medium">{match.time}</span>
          </div>
        )
    }
  }

  const getEventIcon = (event: any) => {
    switch (event.type) {
      case 'GOAL':
        return <span className="text-2xl animate-bounce-subtle">⚽</span>
      case 'CARD':
        return event.cardType === 'RED' ? (
          <span className="text-2xl animate-pulse-fast">🟥</span>
        ) : (
          <span className="text-2xl animate-pulse-fast">🟨</span>
        )
      case 'SUBSTITUTION':
        return <span className="text-2xl animate-bounce-subtle">↕️</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="p-3 glass-morphism rounded-full hover:glass-morphism-hover transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="w-6 h-6 text-stadium-green animate-glow" />
            {match.league.name}
          </h1>
          <p className="text-stadium-muted">{match.league.country}</p>
        </div>
        {getStatusDisplay()}
      </div>

      {/* Score Board */}
      <div className="glass-morphism rounded-3xl p-8 border border-stadium-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stadium-green/5 to-transparent opacity-50" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <span className="text-sm text-stadium-muted font-medium">{match.date}</span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-stadium-green animate-pulse-fast" />
            <span className="text-sm text-stadium-muted">Match Center</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-12 relative z-10">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="w-20 h-20 bg-gradient-to-br from-stadium-navy to-stadium-dark rounded-2xl flex items-center justify-center text-2xl font-bold border-2 border-stadium-glass-border shadow-glass">
              {match.homeTeam.name.charAt(0)}
            </div>
            <span className="font-bold text-lg text-center">{match.homeTeam.name}</span>
          </div>
          
          {/* Score */}
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              <span className={match.status === 'LIVE' ? 'text-stadium-green animate-pulse-emerald' : 'text-white'}>
                {match.score.home ?? 0}
              </span>
              <span className="mx-3 text-stadium-muted">:</span>
              <span className={match.status === 'LIVE' ? 'text-stadium-green animate-pulse-emerald' : 'text-white'}>
                {match.score.away ?? 0}
              </span>
            </div>
            {match.status === 'LIVE' && (
              <div className="text-xs text-stadium-green font-medium animate-pulse-emerald">
                MINUTE {match.minute}
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <span className="font-bold text-lg text-center">{match.awayTeam.name}</span>
            <div className="w-20 h-20 bg-gradient-to-br from-stadium-navy to-stadium-dark rounded-2xl flex items-center justify-center text-2xl font-bold border-2 border-stadium-glass-border shadow-glass">
              {match.awayTeam.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Match Timeline */}
      {match.events && match.events.length > 0 && (
        <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-stadium-green animate-glow" />
            Match Timeline
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {match.events.map((event, index) => (
              <div 
                key={event.id} 
                className={`
                  timeline-item flex items-center gap-4 p-4 glass-morphism rounded-xl border border-stadium-glass-border
                  hover:glass-morphism-hover transition-all cursor-pointer
                  ${event.team === 'away' ? 'flex-row-reverse' : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-stadium-muted font-bold text-sm w-12">
                    {event.minute}&apos;
                  </span>
                  <div className="text-2xl">
                    {getEventIcon(event)}
                  </div>
                </div>
                <div className={`flex-1 ${event.team === 'away' ? 'text-right' : ''}`}>
                  {event.type === 'GOAL' && (
                    <div className="space-y-1">
                      <span className="text-stadium-green font-bold text-lg">
                        ⚽ GOAL! {event.player}
                      </span>
                      {event.assist && (
                        <span className="text-stadium-muted text-sm block">
                          Assist: {event.assist}
                        </span>
                      )}
                    </div>
                  )}
                  {event.type === 'CARD' && (
                    <span className={`${event.cardType === 'RED' ? 'text-red-400' : 'text-yellow-400'} font-medium`}>
                      {event.cardType === 'RED' ? '🟥' : '🟨'} {event.player}
                    </span>
                  )}
                  {event.type === 'SUBSTITUTION' && (
                    <div className="text-stadium-muted">
                      <div className="font-medium">↕️ Substitution</div>
                      <div className="text-sm">
                        {event.playerIn} replaces {event.playerOut}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {match.statistics && (
        <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-stadium-green animate-glow" />
            Team Statistics
          </h2>
          
          <div className="space-y-6">
            {/* Possession */}
            <ProgressBar
              label="Possession"
              homeValue={match.statistics.possession.home}
              awayValue={match.statistics.possession.away}
              homeColor="bg-gradient-to-r from-stadium-green to-emerald-500"
              awayColor="bg-gradient-to-l from-blue-500 to-blue-400"
            />
            
            {/* Shots on Target */}
            <ProgressBar
              label="Shots on Target"
              homeValue={match.statistics.shotsOnTarget.home}
              awayValue={match.statistics.shotsOnTarget.away}
              max={Math.max(match.statistics.shotsOnTarget.home, match.statistics.shotsOnTarget.away, 10)}
              homeColor="bg-gradient-to-r from-stadium-green to-emerald-500"
              awayColor="bg-gradient-to-l from-blue-500 to-blue-400"
            />
            
            {/* Corners */}
            <ProgressBar
              label="Corners"
              homeValue={match.statistics.corners.home}
              awayValue={match.statistics.corners.away}
              max={Math.max(match.statistics.corners.home, match.statistics.corners.away, 10)}
              homeColor="bg-gradient-to-r from-stadium-green to-emerald-500"
              awayColor="bg-gradient-to-l from-blue-500 to-blue-400"
            />
            
            {/* Fouls */}
            <ProgressBar
              label="Fouls"
              homeValue={match.statistics.fouls.home}
              awayValue={match.statistics.fouls.away}
              max={Math.max(match.statistics.fouls.home, match.statistics.fouls.away, 15)}
              homeColor="bg-gradient-to-r from-yellow-500 to-orange-500"
              awayColor="bg-gradient-to-l from-yellow-500 to-orange-500"
            />
            
            {/* xG */}
            {match.statistics.xG && (
              <ProgressBar
                label="Expected Goals (xG)"
                homeValue={match.statistics.xG.home}
                awayValue={match.statistics.xG.away}
                max={Math.max(match.statistics.xG.home, match.statistics.xG.away, 3)}
                homeColor="bg-gradient-to-r from-stadium-green to-emerald-500"
                awayColor="bg-gradient-to-l from-blue-500 to-blue-400"
                showDecimals
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
