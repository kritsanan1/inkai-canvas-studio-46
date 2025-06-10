
/**
 * Refactored design store with better separation of concerns
 * Implements clean state management with proper typing
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Design, DesignFilters } from '@/types/design';

interface DesignState {
  // State
  currentDesign: Design | null;
  designs: Design[];
  favorites: string[];
  filters: DesignFilters;
  
  // Actions - Design Management
  setCurrentDesign: (design: Design | null) => void;
  addDesign: (design: Design) => void;
  updateDesign: (id: string, updates: Partial<Design>) => void;
  deleteDesign: (id: string) => void;
  
  // Actions - Favorites
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Actions - Filters
  setFilters: (filters: Partial<DesignFilters>) => void;
  clearFilters: () => void;
  
  // Actions - Utilities
  getFilteredDesigns: () => Design[];
  clearAll: () => void;
}

const defaultFilters: DesignFilters = {
  styles: [],
  bodyParts: [],
  colors: [],
  artists: [],
  searchQuery: '',
  isAiOnly: false,
  sortBy: 'recent'
};

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentDesign: null,
      designs: [],
      favorites: [],
      filters: defaultFilters,

      // Design management actions
      setCurrentDesign: (design) => set({ currentDesign: design }),

      addDesign: (design) => set((state) => ({
        designs: [design, ...state.designs]
      })),

      updateDesign: (id, updates) => set((state) => ({
        designs: state.designs.map(design =>
          design.id === id ? { ...design, ...updates, updatedAt: new Date().toISOString() } : design
        ),
        currentDesign: state.currentDesign?.id === id
          ? { ...state.currentDesign, ...updates, updatedAt: new Date().toISOString() }
          : state.currentDesign
      })),

      deleteDesign: (id) => set((state) => ({
        designs: state.designs.filter(design => design.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign,
        favorites: state.favorites.filter(favId => favId !== id)
      })),

      // Favorites actions
      addToFavorites: (id) => set((state) => ({
        favorites: state.favorites.includes(id) ? state.favorites : [...state.favorites, id]
      })),

      removeFromFavorites: (id) => set((state) => ({
        favorites: state.favorites.filter(favId => favId !== id)
      })),

      isFavorite: (id) => get().favorites.includes(id),

      // Filter actions
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      clearFilters: () => set({ filters: defaultFilters }),

      // Utility actions
      getFilteredDesigns: () => {
        const { designs, filters } = get();
        
        let filtered = designs.filter(design => {
          // Search query filter
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matchesTitle = design.title.toLowerCase().includes(query);
            const matchesTags = design.tags.some(tag => tag.toLowerCase().includes(query));
            const matchesArtist = design.artist.toLowerCase().includes(query);
            
            if (!matchesTitle && !matchesTags && !matchesArtist) {
              return false;
            }
          }

          // Style filter
          if (filters.styles.length > 0 && !filters.styles.includes(design.style)) {
            return false;
          }

          // Body part filter
          if (filters.bodyParts.length > 0 && !filters.bodyParts.includes(design.bodyPart)) {
            return false;
          }

          // Artist filter
          if (filters.artists.length > 0 && !filters.artists.includes(design.artist)) {
            return false;
          }

          // AI only filter
          if (filters.isAiOnly && !design.isAiEnhanced) {
            return false;
          }

          return true;
        });

        // Apply sorting
        switch (filters.sortBy) {
          case 'popular':
            filtered.sort((a, b) => b.likes - a.likes);
            break;
          case 'rating':
            filtered.sort((a, b) => b.views - a.views);
            break;
          case 'recent':
          default:
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }

        return filtered;
      },

      clearAll: () => set({
        currentDesign: null,
        designs: [],
        favorites: [],
        filters: defaultFilters
      })
    }),
    {
      name: 'design-storage',
      partialize: (state) => ({
        designs: state.designs,
        favorites: state.favorites,
        filters: state.filters
      })
    }
  )
);
