
import { useMemo } from 'react';
import { GalleryItem, FilterState } from '@/types/gallery';

// Mock enhanced data with all required fields
const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: "Geometric Dragon",
    imageUrl: "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png",
    thumbnailUrl: "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png",
    artist: "AI Studio",
    style: "Geometric",
    bodyPart: "Back",
    colors: ["#000000", "#FF6B6B", "#4ECDC4"],
    isAiEnhanced: true,
    likes: 245,
    downloads: 67,
    views: 1200,
    tags: ["dragon", "geometric", "large", "fantasy"],
    featured: true,
    processSteps: [
      {
        id: "1",
        name: "Initial Sketch",
        description: "AI-generated base design using style transfer",
        duration: 5,
        aiInvolved: true
      },
      {
        id: "2", 
        name: "Manual Refinement",
        description: "Artist enhancement and detail work",
        duration: 15,
        aiInvolved: false
      }
    ],
    metadata: {
      originalSize: "2048x2048",
      aiModel: "StyleGAN-v3",
      processingTime: 12,
      confidence: 0.94,
      tags: ["dragon", "geometric", "scales"],
      colorPalette: ["#000000", "#FF6B6B", "#4ECDC4", "#95E1D3"],
      createdAt: new Date('2024-01-15')
    }
  },
  {
    id: '2',
    title: "Minimalist Rose",
    imageUrl: "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png",
    thumbnailUrl: "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png",
    artist: "Sarah Kim",
    style: "Minimalist",
    bodyPart: "Wrist",
    colors: ["#000000"],
    isAiEnhanced: false,
    likes: 189,
    downloads: 45,
    views: 890,
    tags: ["rose", "minimalist", "small", "delicate"],
    processSteps: [],
    metadata: {
      originalSize: "1024x1024",
      processingTime: 0,
      confidence: 1.0,
      tags: ["rose", "minimalist"],
      colorPalette: ["#000000", "#FFFFFF"],
      createdAt: new Date('2024-01-10')
    }
  },
  {
    id: '3',
    title: "Tribal Phoenix",
    imageUrl: "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png",
    thumbnailUrl: "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png",
    artist: "Marcus Chen",
    style: "Tribal",
    bodyPart: "Shoulder",
    colors: ["#000000", "#8B0000"],
    isAiEnhanced: true,
    likes: 321,
    downloads: 89,
    views: 1567,
    tags: ["phoenix", "tribal", "medium", "fire"],
    beforeImage: "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png",
    afterImage: "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png",
    processSteps: [
      {
        id: "3",
        name: "Style Analysis",
        description: "AI analysis of tribal patterns",
        duration: 3,
        aiInvolved: true
      }
    ],
    metadata: {
      originalSize: "1536x1536",
      aiModel: "TribalNet-v2",
      processingTime: 8,
      confidence: 0.89,
      tags: ["phoenix", "tribal", "wings"],
      colorPalette: ["#000000", "#8B0000", "#FF4500"],
      createdAt: new Date('2024-01-12')
    }
  },
  {
    id: '4',
    title: "Blackwork Mandala",
    imageUrl: "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png",
    thumbnailUrl: "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png",
    artist: "Diego Rodriguez",
    style: "Blackwork",
    bodyPart: "Chest",
    colors: ["#000000"],
    isAiEnhanced: true,
    likes: 412,
    downloads: 123,
    views: 2100,
    tags: ["mandala", "blackwork", "large", "sacred"],
    featured: true,
    processSteps: [
      {
        id: "4",
        name: "Pattern Generation",
        description: "AI-generated mandala patterns",
        duration: 10,
        aiInvolved: true
      }
    ],
    metadata: {
      originalSize: "2560x2560",
      aiModel: "MandalaGen-Pro",
      processingTime: 15,
      confidence: 0.96,
      tags: ["mandala", "sacred", "geometric"],
      colorPalette: ["#000000", "#1A1A1A"],
      createdAt: new Date('2024-01-08')
    }
  }
];

export const useGalleryData = (filters: FilterState) => {
  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = mockGalleryItems.filter(item => {
      // Search query
      if (filters.searchQuery && !item.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !item.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
        return false;
      }

      // Style filter
      if (filters.styles.length > 0 && !filters.styles.includes(item.style)) {
        return false;
      }

      // Body part filter
      if (filters.bodyParts.length > 0 && !filters.bodyParts.includes(item.bodyPart)) {
        return false;
      }

      // Artist filter
      if (filters.artists.length > 0 && !filters.artists.includes(item.artist)) {
        return false;
      }

      // AI only filter
      if (filters.isAiOnly && !item.isAiEnhanced) {
        return false;
      }

      return true;
    });

    // Sort
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime());
        break;
    }

    return filtered;
  }, [filters]);

  return { filteredItems, mockGalleryItems };
};
