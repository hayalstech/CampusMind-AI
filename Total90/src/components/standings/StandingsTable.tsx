import { Standing } from '@/types/football'
import { TrendingUp, TrendingDown, Minus, Trophy, Shield, AlertTriangle } from 'lucide-react'

interface StandingsTableProps {
  standings: Standing[]
}

export function StandingsTable({ standings }: StandingsTableProps) {
  const getFormIcon = (result: string) => {
    switch (result) {
      case 'W':
        return <span className="w-6 h-6 bg-stadium-green rounded-lg flex items-center justify-center text-xs font-bold shadow-glass">W</span>
      case 'D':
        return <span className="w-6 h-6 bg-stadium-muted rounded-lg flex items-center justify-center text-xs font-bold">D</span>
      case 'L':
        return <span className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-xs font-bold">L</span>
      default:
        return null
    }
  }

  const getPositionIcon = (position: number, total: number) => {
    if (position === 1) return <Trophy className="w-4 h-4 text-yellow-400" />
    if (position === 2) return <Trophy className="w-4 h-4 text-gray-300" />
    if (position === 3) return <Trophy className="w-4 h-4 text-orange-400" />
    if (position === 4) return <Shield className="w-4 h-4 text-stadium-green" />
    if (position === 5) return <Shield className="w-4 h-4 text-orange-500" />
    if (position >= total - 2) return <AlertTriangle className="w-4 h-4 text-red-400" />
    return null
  }

  const getPositionBackground = (position: number, total: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
    if (position === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30'
    if (position === 3) return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30'
    if (position <= 4) return 'bg-gradient-to-r from-stadium-green/20 to-emerald-500/20 border-stadium-green/30'
    if (position === 5) return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30'
    if (position >= total - 2) return 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30'
    return ''
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-stadium-glass-border overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stadium-glass-border">
              <th className="py-4 px-3 text-left font-semibold text-stadium-muted text-sm uppercase tracking-wider">#</th>
              <th className="py-4 px-3 text-left font-semibold text-stadium-muted text-sm uppercase tracking-wider">Team</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">P</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">W</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">D</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">L</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">GF</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">GA</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">GD</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">Pts</th>
              <th className="py-4 px-3 text-center font-semibold text-stadium-muted text-sm uppercase tracking-wider">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => {
              const positionBg = getPositionBackground(team.position, standings.length)
              const positionIcon = getPositionIcon(team.position, standings.length)
              
              return (
                <tr 
                  key={team.team.id} 
                  className={`
                    border-b border-stadium-glass-border/50 hover:glass-morphism-hover transition-all duration-300 cursor-pointer group
                    ${positionBg}
                  `}
                >
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all
                        ${positionBg ? 'text-white' : 'text-stadium-muted'}
                      `}>
                        {team.position}
                      </span>
                      {positionIcon && (
                        <div className="animate-bounce-subtle">
                          {positionIcon}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-stadium-navy to-stadium-dark rounded-xl flex items-center justify-center text-sm font-bold border border-stadium-glass-shadow transition-transform group-hover:scale-110">
                        {team.team.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white group-hover:text-stadium-green transition-colors">
                        {team.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center text-stadium-muted font-medium">{team.played}</td>
                  <td className="py-4 px-3 text-center text-stadium-green font-bold">{team.won}</td>
                  <td className="py-4 px-3 text-center text-stadium-muted font-medium">{team.drawn}</td>
                  <td className="py-4 px-3 text-center text-red-400 font-bold">{team.lost}</td>
                  <td className="py-4 px-3 text-center text-white font-medium">{team.goalsFor}</td>
                  <td className="py-4 px-3 text-center text-white font-medium">{team.goalsAgainst}</td>
                  <td className="py-4 px-3 text-center font-bold">
                    <span className={team.goalDifference > 0 ? 'text-stadium-green' : team.goalDifference < 0 ? 'text-red-400' : 'text-stadium-muted'}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-xl font-bold text-stadium-green neon-glow">
                      {team.points}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex gap-1 justify-center">
                      {team.form?.split('').map((result, idx) => (
                        <div key={idx} className="transform hover:scale-110 transition-transform">
                          {getFormIcon(result)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Enhanced Legend */}
      <div className="mt-6 flex flex-wrap gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <Shield className="w-4 h-4 text-stadium-green" />
          </div>
          <span className="text-stadium-muted">Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-orange-500" />
          <span className="text-stadium-muted">Europa League</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-stadium-muted">Relegation</span>
        </div>
      </div>
    </div>
  )
}
