import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DesignState {
  currentDesign: {
    id?: string;
    prompt?: string;
    style?: string;
    imageUrl?: string;
    createdAt?: Date;
  } | null;
  favorites: string[];
  recentSearches: string[];
  userPreferences: {
    defaultStyle: string;
    autoSave: boolean;
    notifications: boolean;
  };
}

interface DesignActions {
  setCurrentDesign: (design: DesignState['currentDesign']) => void;
  addToFavorites: (designId: string) => void;
  removeFromFavorites: (designId: string) => void;
  addRecentSearch: (query: string) => void;
  updateUserPreferences: (preferences: Partial<DesignState['userPreferences']>) => void;
  clearCurrentDesign: () => void;
}

type AppStore = DesignState & DesignActions;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentDesign: null,
      favorites: [],
      recentSearches: [],
      userPreferences: {
        defaultStyle: 'traditional',
        autoSave: true,
        notifications: true,
      },

      // Actions
      setCurrentDesign: (design) => set({ currentDesign: design }),
      
      addToFavorites: (designId) => set((state) => ({
        favorites: state.favorites.includes(designId) 
          ? state.favorites 
          : [...state.favorites, designId]
      })),
      
      removeFromFavorites: (designId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== designId)
      })),
      
      addRecentSearch: (query) => set((state) => {
        const updatedSearches = [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 10);
        return { recentSearches: updatedSearches };
      }),
      
      updateUserPreferences: (preferences) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...preferences }
      })),
      
      clearCurrentDesign: () => set({ currentDesign: null }),
    }),
    {
      name: 'inkai-studio-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentSearches: state.recentSearches,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

// Selectors for computed values
export const useFavoriteCount = () => useAppStore((state) => state.favorites.length);
export const useIsFavorite = (designId: string) => 
  useAppStore((state) => state.favorites.includes(designId));
export const useRecentSearches = () => useAppStore((state) => state.recentSearches);
export const useUserPreferences = () => useAppStore((state) => state.userPreferences);