import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteTeams: number[]
  toggleFavorite: (teamId: number) => void
  isFavorite: (teamId: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteTeams: [],
      toggleFavorite: (teamId: number) => {
        const { favoriteTeams } = get()
        if (favoriteTeams.includes(teamId)) {
          set({ favoriteTeams: favoriteTeams.filter(id => id !== teamId) })
        } else {
          set({ favoriteTeams: [...favoriteTeams, teamId] })
        }
      },
      isFavorite: (teamId: number) => {
        return get().favoriteTeams.includes(teamId)
      },
    }),
    {
      name: 'pitchpulse-favorites',
    }
  )
)
