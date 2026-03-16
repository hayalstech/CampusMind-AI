import { Match, League, Standing } from '@/types/football'

// Mock data service since we don't have real API keys
// In production, replace these with actual API calls to API-Football or Football-Data.org

const MOCK_LEAGUES: League[] = [
  { id: 39, name: 'Premier League', country: 'England', logo: '/leagues/epl.png' },
  { id: 140, name: 'La Liga', country: 'Spain', logo: '/leagues/laliga.png' },
  { id: 78, name: 'Bundesliga', country: 'Germany', logo: '/leagues/bundesliga.png' },
  { id: 135, name: 'Serie A', country: 'Italy', logo: '/leagues/seriea.png' },
  { id: 61, name: 'Ligue 1', country: 'France', logo: '/leagues/ligue1.png' },
  { id: 2, name: 'Champions League', country: 'Europe', logo: '/leagues/ucl.png' },
]

const generateMockMatches = (): Match[] => {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
  return [
    {
      id: 1,
      league: MOCK_LEAGUES[0],
      homeTeam: { id: 33, name: 'Manchester United', logo: '/teams/manutd.png' },
      awayTeam: { id: 50, name: 'Manchester City', logo: '/teams/mancity.png' },
      score: { home: 2, away: 1 },
      status: 'LIVE',
      time: '67\'',
      date: today,
      minute: 67,
      events: [
        { id: 1, type: 'GOAL', minute: 23, team: 'home', player: 'Rashford' },
        { id: 2, type: 'CARD', minute: 34, team: 'away', player: 'Rodri', cardType: 'YELLOW' },
        { id: 3, type: 'GOAL', minute: 45, team: 'away', player: 'Haaland' },
        { id: 4, type: 'SUBSTITUTION', minute: 56, team: 'home', playerIn: 'Garnacho', playerOut: 'Antony' },
        { id: 5, type: 'GOAL', minute: 62, team: 'home', player: 'Fernandes' },
      ],
      statistics: {
        possession: { home: 42, away: 58 },
        shotsOnTarget: { home: 5, away: 8 },
        shotsOffTarget: { home: 3, away: 4 },
        corners: { home: 4, away: 6 },
        fouls: { home: 8, away: 6 },
        xG: { home: 1.8, away: 2.3 },
      }
    },
    {
      id: 2,
      league: MOCK_LEAGUES[0],
      homeTeam: { id: 40, name: 'Liverpool', logo: '/teams/liverpool.png' },
      awayTeam: { id: 42, name: 'Arsenal', logo: '/teams/arsenal.png' },
      score: { home: 0, away: 0 },
      status: 'LIVE',
      time: '12\'',
      date: today,
      minute: 12,
      events: [
        { id: 6, type: 'CARD', minute: 8, team: 'away', player: 'Saliba', cardType: 'YELLOW' },
      ],
      statistics: {
        possession: { home: 55, away: 45 },
        shotsOnTarget: { home: 1, away: 0 },
        shotsOffTarget: { home: 2, away: 1 },
        corners: { home: 2, away: 1 },
        fouls: { home: 3, away: 4 },
        xG: { home: 0.4, away: 0.2 },
      }
    },
    {
      id: 3,
      league: MOCK_LEAGUES[1],
      homeTeam: { id: 541, name: 'Real Madrid', logo: '/teams/realmadrid.png' },
      awayTeam: { id: 529, name: 'Barcelona', logo: '/teams/barcelona.png' },
      score: { home: 3, away: 2 },
      status: 'FINISHED',
      time: 'FT',
      date: today,
      events: [
        { id: 7, type: 'GOAL', minute: 15, team: 'home', player: 'Bellingham' },
        { id: 8, type: 'GOAL', minute: 28, team: 'away', player: 'Lewandowski' },
        { id: 9, type: 'GOAL', minute: 45, team: 'home', player: 'Vinicius Jr' },
        { id: 10, type: 'CARD', minute: 62, team: 'away', player: 'Gavi', cardType: 'RED' },
        { id: 11, type: 'GOAL', minute: 78, team: 'away', player: 'Pedri' },
        { id: 12, type: 'GOAL', minute: 89, team: 'home', player: 'Rodrygo' },
      ],
      statistics: {
        possession: { home: 48, away: 52 },
        shotsOnTarget: { home: 7, away: 5 },
        shotsOffTarget: { home: 4, away: 6 },
        corners: { home: 5, away: 4 },
        fouls: { home: 12, away: 14 },
        xG: { home: 2.8, away: 2.1 },
      }
    },
    {
      id: 4,
      league: MOCK_LEAGUES[2],
      homeTeam: { id: 157, name: 'Bayern Munich', logo: '/teams/bayern.png' },
      awayTeam: { id: 160, name: 'Borussia Dortmund', logo: '/teams/dortmund.png' },
      score: { home: null, away: null },
      status: 'SCHEDULED',
      time: '20:30',
      date: today,
    },
    {
      id: 5,
      league: MOCK_LEAGUES[3],
      homeTeam: { id: 489, name: 'AC Milan', logo: '/teams/milan.png' },
      awayTeam: { id: 505, name: 'Inter Milan', logo: '/teams/inter.png' },
      score: { home: 1, away: 1 },
      status: 'PAUSED',
      time: 'HT',
      date: today,
      minute: 45,
      events: [
        { id: 13, type: 'GOAL', minute: 23, team: 'home', player: 'Leao' },
        { id: 14, type: 'GOAL', minute: 41, team: 'away', player: 'Lautaro' },
      ],
      statistics: {
        possession: { home: 45, away: 55 },
        shotsOnTarget: { home: 3, away: 4 },
        shotsOffTarget: { home: 2, away: 3 },
        corners: { home: 3, away: 3 },
        fouls: { home: 5, away: 4 },
        xG: { home: 0.9, away: 1.2 },
      }
    },
    {
      id: 6,
      league: MOCK_LEAGUES[5],
      homeTeam: { id: 49, name: 'Chelsea', logo: '/teams/chelsea.png' },
      awayTeam: { id: 47, name: 'Tottenham', logo: '/teams/tottenham.png' },
      score: { home: null, away: null },
      status: 'SCHEDULED',
      time: '21:00',
      date: today,
    },
  ]
}

const generateMockStandings = (leagueId: number): Standing[] => {
  const teams = [
    { id: 50, name: 'Manchester City', logo: '/teams/mancity.png' },
    { id: 40, name: 'Liverpool', logo: '/teams/liverpool.png' },
    { id: 42, name: 'Arsenal', logo: '/teams/arsenal.png' },
    { id: 66, name: 'Aston Villa', logo: '/teams/villa.png' },
    { id: 47, name: 'Tottenham', logo: '/teams/tottenham.png' },
    { id: 49, name: 'Chelsea', logo: '/teams/chelsea.png' },
    { id: 33, name: 'Manchester United', logo: '/teams/manutd.png' },
    { id: 34, name: 'Newcastle', logo: '/teams/newcastle.png' },
  ]
  
  return teams.map((team, index) => ({
    position: index + 1,
    team,
    played: 25,
    won: 18 - index * 2,
    drawn: 4,
    lost: 3 + index * 2,
    goalsFor: 60 - index * 5,
    goalsAgainst: 20 + index * 3,
    goalDifference: 40 - index * 8,
    points: 58 - index * 6,
    form: 'WWDLW',
  }))
}

export const footballApi = {
  getMatches: async (filter?: 'LIVE' | 'FINISHED' | 'SCHEDULED' | 'ALL'): Promise<Match[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const matches = generateMockMatches()
    
    if (filter && filter !== 'ALL') {
      return matches.filter(match => match.status === filter)
    }
    
    return matches
  },
  
  getMatchById: async (id: number): Promise<Match | null> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const matches = generateMockMatches()
    return matches.find(match => match.id === id) || null
  },
  
  getLeagues: async (): Promise<League[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return MOCK_LEAGUES
  },
  
  getStandings: async (leagueId: number): Promise<Standing[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return generateMockStandings(leagueId)
  },
}
