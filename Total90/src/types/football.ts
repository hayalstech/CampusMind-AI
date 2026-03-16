export interface Team {
  id: number
  name: string
  logo: string
}

export interface Score {
  home: number | null
  away: number | null
}

export interface Match {
  id: number
  league: League
  homeTeam: Team
  awayTeam: Team
  score: Score
  status: 'LIVE' | 'FINISHED' | 'SCHEDULED' | 'PAUSED'
  time: string
  date: string
  minute?: number
  events?: MatchEvent[]
  statistics?: MatchStatistics
}

export interface MatchEvent {
  id: number
  type: 'GOAL' | 'CARD' | 'SUBSTITUTION'
  minute: number
  team: 'home' | 'away'
  player?: string
  assist?: string
  cardType?: 'YELLOW' | 'RED'
  playerIn?: string
  playerOut?: string
}

export interface MatchStatistics {
  possession: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  shotsOffTarget: { home: number; away: number }
  corners: { home: number; away: number }
  fouls: { home: number; away: number }
  xG?: { home: number; away: number }
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
}

export interface Standing {
  position: number
  team: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form?: string
}
