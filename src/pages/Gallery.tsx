
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Search, 
  Filter, 
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import FilterSidebar from '@/components/gallery/FilterSidebar';
import ImageModal from '@/components/gallery/ImageModal';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import { FilterState, GalleryItem } from '@/types/gallery';
import { useAppStore } from '@/stores/useAppStore';

const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    styles: [],
    bodyParts: [],
    colors: [],
    artists: [],
    searchQuery: '',
    isAiOnly: false,
    sortBy: 'recent'
  });

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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalNavigation = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= filteredItems.length) newIndex = 0;
    if (newIndex < 0) newIndex = filteredItems.length - 1;
    
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card">
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isFilterOpen ? 'lg:ml-80' : ''}`}>
          <div className="pt-20 pb-10 px-4 lg:px-8">
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Design Gallery
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore thousands of AI-generated and traditional tattoo designs
              </p>
            </motion.div>

            {/* Controls */}
            <motion.div 
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search designs, styles, artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input/50 border-border/30 focus:border-primary/50"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="hidden lg:flex"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>

                  {/* Sort */}
                  <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as any)}>
                    <ToggleGroupItem value="grid">
                      <Grid3X3 className="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list">
                      <List className="w-4 h-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{filteredItems.length} designs found</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Trending
                  </span>
                  <span className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Enhanced
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MasonryGrid
                items={filteredItems}
                onItemClick={handleItemClick}
              />
            </motion.div>

            {/* Load More */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                Load More Designs
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={() => handleModalNavigation('next')}
        onPrevious={() => handleModalNavigation('prev')}
        showNavigation={filteredItems.length > 1}
      />
    </div>
  );
};

export default Gallery;
