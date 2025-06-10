
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // UI State
  isNavigationOpen: boolean;
  setNavigationOpen: (open: boolean) => void;
  
  // Gallery favorites (deprecated - moved to useDesignStore)
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  
  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeSection: 'home',
      setActiveSection: (section) => set({ activeSection: section }),
      
      isNavigationOpen: false,
      setNavigationOpen: (open) => set({ isNavigationOpen: open }),
      
      favorites: [],
      addToFavorites: (id) => set((state) => ({
        favorites: [...state.favorites, id]
      })),
      removeFromFavorites: (id) => set((state) => ({
        favorites: state.favorites.filter(favId => favId !== id)
      })),
      
      theme: 'dark',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme
      })
    }
  )
);
