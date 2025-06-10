
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Design {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  artist: string;
  style: string;
  bodyPart: string;
  colors: string[];
  tags: string[];
  isAiEnhanced: boolean;
  status: 'draft' | 'in_progress' | 'completed' | 'published';
  isPublic: boolean;
  metadata: {
    processingTime?: number;
    colorPalette: string[];
    aiModel?: string;
    prompt?: string;
  };
  processSteps: Array<{
    id: string;
    name: string;
    description: string;
    duration: number;
    aiInvolved: boolean;
  }>;
  beforeImage?: string;
  afterImage?: string;
  views: number;
  likes: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

interface AIGenerationParams {
  prompt: string;
  style: string;
  creativity: number;
  detail: number;
  colorIntensity: number;
  negativePrompt?: string;
}

interface DesignState {
  currentDesign: Design | null;
  designs: Design[];
  favorites: string[];
  isGenerating: boolean;
  generationProgress: number;
  filters: {
    styles: string[];
    bodyParts: string[];
    colors: string[];
    artists: string[];
    searchQuery: string;
    isAiOnly: boolean;
    sortBy: 'recent' | 'popular' | 'rating';
  };
  
  // Actions
  setCurrentDesign: (design: Design | null) => void;
  addDesign: (design: Design) => void;
  updateDesign: (id: string, updates: Partial<Design>) => void;
  deleteDesign: (id: string) => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  generateDesign: (params: AIGenerationParams) => Promise<Design | null>;
  setFilters: (filters: Partial<DesignState['filters']>) => void;
  clearFilters: () => void;
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      currentDesign: null,
      designs: [],
      favorites: [],
      isGenerating: false,
      generationProgress: 0,
      filters: {
        styles: [],
        bodyParts: [],
        colors: [],
        artists: [],
        searchQuery: '',
        isAiOnly: false,
        sortBy: 'recent'
      },

      setCurrentDesign: (design) => set({ currentDesign: design }),

      addDesign: (design) => set((state) => ({
        designs: [design, ...state.designs]
      })),

      updateDesign: (id, updates) => set((state) => ({
        designs: state.designs.map(design =>
          design.id === id ? { ...design, ...updates } : design
        ),
        currentDesign: state.currentDesign?.id === id
          ? { ...state.currentDesign, ...updates }
          : state.currentDesign
      })),

      deleteDesign: (id) => set((state) => ({
        designs: state.designs.filter(design => design.id !== id),
        currentDesign: state.currentDesign?.id === id ? null : state.currentDesign
      })),

      addToFavorites: (id) => set((state) => ({
        favorites: [...state.favorites, id]
      })),

      removeFromFavorites: (id) => set((state) => ({
        favorites: state.favorites.filter(favId => favId !== id)
      })),

      generateDesign: async (params) => {
        set({ isGenerating: true, generationProgress: 0 });
        
        try {
          // Simulate AI generation process
          const intervals = [20, 40, 60, 80, 100];
          for (const progress of intervals) {
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ generationProgress: progress });
          }

          // Create mock design for now
          const newDesign: Design = {
            id: `design-${Date.now()}`,
            title: `AI Generated Design ${Date.now()}`,
            description: `Generated from prompt: "${params.prompt}"`,
            imageUrl: '/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png',
            thumbnailUrl: '/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png',
            artist: 'AI Studio',
            style: params.style,
            bodyPart: 'arm',
            colors: ['#000000', '#ff0000', '#00ff00'],
            tags: ['ai-generated', params.style, 'modern'],
            isAiEnhanced: true,
            status: 'completed',
            isPublic: true,
            metadata: {
              processingTime: 25,
              colorPalette: ['#000000', '#ff0000', '#00ff00'],
              aiModel: 'stable-diffusion-xl',
              prompt: params.prompt
            },
            processSteps: [
              {
                id: 'step-1',
                name: 'Prompt Analysis',
                description: 'Analyzing input prompt and style preferences',
                duration: 2,
                aiInvolved: true
              },
              {
                id: 'step-2',
                name: 'Style Generation',
                description: 'Generating base design with AI models',
                duration: 15,
                aiInvolved: true
              },
              {
                id: 'step-3',
                name: 'Refinement',
                description: 'Refining details and composition',
                duration: 8,
                aiInvolved: true
              }
            ],
            views: 0,
            likes: 0,
            downloads: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          get().addDesign(newDesign);
          set({ isGenerating: false, generationProgress: 0 });
          return newDesign;
        } catch (error) {
          console.error('AI Generation failed:', error);
          set({ isGenerating: false, generationProgress: 0 });
          return null;
        }
      },

      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      clearFilters: () => set({
        filters: {
          styles: [],
          bodyParts: [],
          colors: [],
          artists: [],
          searchQuery: '',
          isAiOnly: false,
          sortBy: 'recent'
        }
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
