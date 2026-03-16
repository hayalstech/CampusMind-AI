interface ProgressBarProps {
  label: string
  homeValue: number
  awayValue: number
  max?: number
  homeColor?: string
  awayColor?: string
  showDecimals?: boolean
}

export function ProgressBar({
  label,
  homeValue,
  awayValue,
  max,
  homeColor = 'bg-gradient-to-r from-stadium-green to-emerald-500',
  awayColor = 'bg-gradient-to-l from-blue-500 to-blue-400',
  showDecimals = false,
}: ProgressBarProps) {
  const displayMax = max ?? (Math.max(homeValue, awayValue) * 1.2 || 1)
  const homePercent = (homeValue / displayMax) * 50
  const awayPercent = (awayValue / displayMax) * 50

  const formatValue = (val: number) => (showDecimals ? val.toFixed(1) : Math.round(val))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-stadium-green rounded-full animate-pulse-fast" />
          {formatValue(homeValue)}
        </span>
        <span className="text-stadium-muted font-medium">{label}</span>
        <span className="font-bold text-white flex items-center gap-2">
          {formatValue(awayValue)}
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-fast" />
        </span>
      </div>
      
      <div className="relative h-3 glass-morphism rounded-full overflow-hidden border border-stadium-glass-border">
        <div className="absolute inset-0 flex">
          {/* Home Team Progress */}
          <div
            className={`
              progress-bar-fill relative overflow-hidden
              ${homeColor} rounded-r-full
              ${homeValue > awayValue ? 'neon-glow' : ''}
            `}
            style={{ 
              width: `${homePercent}%`, 
              marginLeft: `${50 - homePercent}%`,
            }}
          >
            <div className="absolute inset-0 bg-shimmer opacity-30" />
          </div>
          
          {/* Away Team Progress */}
          <div
            className={`
              progress-bar-fill relative overflow-hidden
              ${awayColor} rounded-l-full
              ${awayValue > homeValue ? 'neon-glow' : ''}
            `}
            style={{ width: `${awayPercent}%` }}
          >
            <div className="absolute inset-0 bg-shimmer opacity-30" />
          </div>
        </div>
        
        {/* Center divider */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-stadium-glass-border" />
      </div>
      
      {/* Percentage labels */}
      <div className="flex justify-between text-xs text-stadium-muted">
        <span>{Math.round((homeValue / displayMax) * 100)}%</span>
        <span>{Math.round((awayValue / displayMax) * 100)}%</span>
      </div>
    </div>
  )
}
