
import { useState, useEffect, useMemo } from 'react';
import FilterSidebar from '@/components/gallery/FilterSidebar';
import ImageModal from '@/components/gallery/ImageModal';
import GalleryHeader from '@/components/gallery/GalleryHeader';
import GalleryControls from '@/components/gallery/GalleryControls';
import GalleryResults from '@/components/gallery/GalleryResults';
import MobileOptimizedGrid from '@/components/gallery/MobileOptimizedGrid';
import BottomNavigation from '@/components/mobile/BottomNavigation';
import SEOWrapper from '@/components/SEOWrapper';
import { FilterState, GalleryItem } from '@/types/gallery';
import { useGalleryData } from '@/hooks/useGalleryData';
import { seoService } from '@/services/seoService';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const isMobile = useIsMobile();
  const { filteredItems } = useGalleryData(filters);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, searchQuery }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Generate structured data for gallery
  const structuredData = useMemo(() => {
    const creativeWorks = filteredItems.slice(0, 10).map(item => 
      seoService.getCreativeWorkSchema(item)
    );
    
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Tattoo Design Gallery',
        description: 'Browse thousands of AI-generated and traditional tattoo designs',
        url: 'https://inkai-studio.lovable.app/gallery',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: filteredItems.length,
          itemListElement: creativeWorks
        }
      },
      ...creativeWorks
    ];
  }, [filteredItems]);

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
    <SEOWrapper
      title="Tattoo Design Gallery - Browse AI-Generated & Traditional Designs | InkAI Studio"
      description="Explore thousands of unique tattoo designs. Filter by style, body part, artist, and more. Find your perfect tattoo design from our AI-generated and traditional collection."
      keywords="tattoo gallery, tattoo designs, AI tattoo art, geometric tattoos, minimalist tattoos, blackwork tattoos, tattoo inspiration"
      structuredData={structuredData}
    >
      <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pb-20 md:pb-0">
        <div className="flex">
          {/* Desktop Filter Sidebar */}
          {!isMobile && (
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${!isMobile && isFilterOpen ? 'lg:ml-80' : ''}`}>
            <div className="pt-20 pb-4 md:pb-10 px-4 lg:px-8">
              <GalleryHeader />

              <GalleryControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filters={filters}
                setFilters={setFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />

              <GalleryResults itemCount={filteredItems.length} />

              {/* Mobile-optimized gallery grid */}
              <MobileOptimizedGrid
                items={filteredItems}
                onItemClick={handleItemClick}
              />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && <BottomNavigation />}

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
    </SEOWrapper>
  );
};

export default Gallery;
