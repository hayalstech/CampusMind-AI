# PitchPulse - Live Football Dashboard

A high-performance, real-time football dashboard built with Next.js 14, Tailwind CSS, and TanStack Query.

![PitchPulse Dashboard](https://via.placeholder.com/800x400/0f172a/22c55e?text=PitchPulse+Dashboard)

## Features

- **Real-time Match Updates**: Live scores with 60-second polling using TanStack Query
- **Match Day View**: Filter matches by Live, Finished, and Scheduled status
- **Match Details**: Dynamic timeline showing goals, cards, and substitutions
- **Team Statistics**: Visual progress bars for possession, shots, corners, and xG
- **League Standings**: Sortable tables with Champions League and relegation indicators
- **Favorites System**: Star your favorite teams to track their matches (persisted via Zustand)
- **Dark Stadium Theme**: Deep Navy (#0f172a) with Neon Green (#22c55e) accents
- **Mobile-First Design**: Optimized for checking scores on the go

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query) with background polling
- **State Management**: Zustand with persistence middleware
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pitchpulse

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### API Configuration

The project includes a mock data service for demonstration purposes. To connect to a real football API:

1. Sign up for an API key from [API-Football](https://www.api-football.com/) or [Football-Data.org](https://www.football-data.org/)
2. Create a `.env.local` file:
```
NEXT_PUBLIC_FOOTBALL_API_KEY=your_api_key_here
```
3. Update the `footballApi.ts` service to use real API endpoints

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with QueryProvider
│   ├── page.tsx            # Match Day dashboard
│   ├── globals.css         # Global styles + custom scrollbar
│   ├── match/[id]/
│   │   └── page.tsx        # Match detail page
│   ├── standings/
│   │   └── page.tsx        # League standings page
│   └── favorites/
│       └── page.tsx        # Favorites page
├── components/
│   ├── match/
│   │   ├── MatchDay.tsx    # Match filtering and display
│   │   ├── MatchCard.tsx   # Individual match component
│   │   ├── MatchDetail.tsx # Detailed match view
│   │   └── ProgressBar.tsx # Statistics visualizations
│   ├── standings/
│   │   └── StandingsTable.tsx
│   ├── navigation/
│   │   └── Navigation.tsx  # Bottom/Top navigation
│   └── providers/
│       └── QueryProvider.tsx
├── services/
│   └── footballApi.ts      # API service layer
├── store/
│   └── favorites.ts        # Zustand favorites store
└── types/
    └── football.ts         # TypeScript interfaces
```

## Key Features Explained

### Data Fetching with TanStack Query

The application uses TanStack Query for efficient data fetching:

```typescript
const { data: matches, isLoading } = useQuery({
  queryKey: ['matches', filter],
  queryFn: () => footballApi.getMatches(filter),
  refetchInterval: filter === 'LIVE' ? 60000 : false, // 60s polling for live
  staleTime: 30000,
})
```

### Favorites with Zustand

User favorites are persisted to localStorage:

```typescript
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteTeams: [],
      toggleFavorite: (teamId: number) => {
        // Toggle logic
      },
    }),
    { name: 'pitchpulse-favorites' }
  )
)
```

### Mobile-First Navigation

The navigation adapts between mobile (bottom bar) and desktop (top bar):

```typescript
<nav className="fixed bottom-0 ... md:relative md:border-t-0">
  {/* Navigation content */}
</nav>
```

## Performance Optimizations

- Server Components for static league data
- Client Components for live score tickers
- Background refetching with TanStack Query
- Optimistic UI updates for favorites
- CSS transitions for smooth interactions

## Future Enhancements

- [ ] Player statistics and lineups
- [ ] Push notifications for favorite team goals
- [ ] League filters for match day view
- [ ] Historical match data
- [ ] Multi-language support

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Football data provided by mock service (replace with real API for production)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
