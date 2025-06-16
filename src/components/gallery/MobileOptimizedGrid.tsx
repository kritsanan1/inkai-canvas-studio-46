
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform, PanInfo } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Download, 
  Eye, 
  Sparkles, 
  Share2,
  MoreHorizontal 
} from 'lucide-react';
import { GalleryItem } from '@/types/gallery';
import { useAppStore } from '@/stores/useAppStore';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
  loading?: boolean;
}

const MobileOptimizedGrid = ({ items, onItemClick, loading = false }: MobileOptimizedGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [columns, setColumns] = useState(2);
  const [visibleItems, setVisibleItems] = useState(20);
  const gridRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const { addToFavorites, removeFromFavorites, favorites } = useAppStore();
  const isMobile = useIsMobile();

  // Responsive columns with mobile-first approach
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2);        // Mobile: 2 columns
      else if (width < 768) setColumns(2);   // Small mobile: 2 columns  
      else if (width < 1024) setColumns(3);  // Tablet: 3 columns
      else if (width < 1280) setColumns(4);  // Desktop: 4 columns
      else setColumns(5);                    // Large desktop: 5 columns
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Infinite scroll for mobile
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleItems < items.length) {
        setVisibleItems(prev => Math.min(prev + 10, items.length));
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, visibleItems, items.length]);

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const handleFavorite = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    const isFavorite = favorites.includes(item.id);
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item.id);
    }
  };

  const handleShare = async (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this amazing tattoo design: ${item.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const handleDownload = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Distribute items into columns
  const distributeItems = () => {
    const columnArrays: GalleryItem[][] = Array.from({ length: columns }, () => []);
    
    items.slice(0, visibleItems).forEach((item, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(item);
    });
    
    return columnArrays;
  };

  const columnArrays = distributeItems();

  return (
    <div 
      ref={gridRef}
      className="grid gap-3 md:gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {columnArrays.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="space-y-3 md:space-y-4">
          {columnItems.map((item, itemIndex) => {
            const isLoaded = loadedImages.has(item.id);
            const isFavorite = favorites.includes(item.id);
            const isLastItem = itemIndex === columnItems.length - 1 && 
                              columnIndex === columnArrays.length - 1 && 
                              visibleItems < items.length;
            
            return (
              <motion.div
                key={item.id}
                ref={isLastItem ? lastItemRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isMobile ? (itemIndex * 0.1) : (columnIndex * 0.1) + (itemIndex * 0.05) 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 active:scale-95"
                  onClick={() => onItemClick(item)}
                >
                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-muted/20">
                      {!isLoaded && (
                        <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/10 animate-pulse" />
                      )}
                      <img
                        src={item.thumbnailUrl || item.imageUrl}
                        alt={item.title}
                        className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                        }`}
                        onLoad={() => handleImageLoad(item.id)}
                        loading="lazy"
                      />
                      
                      {/* Mobile-optimized overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Action Buttons - Simplified for mobile */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col space-y-1 md:space-y-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 hover:bg-white md:w-10 md:h-10"
                          onClick={(e) => handleFavorite(e, item)}
                        >
                          <Heart 
                            className={`w-3 h-3 md:w-4 md:h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                        
                        {isMobile && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                            onClick={(e) => handleShare(e, item)}
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 hover:bg-white md:w-10 md:h-10"
                          onClick={(e) => handleDownload(e, item)}
                        >
                          <Download className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </div>

                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-secondary to-accent text-black text-xs">
                            <Sparkles className="w-2 h-2 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}

                      {/* AI Badge */}
                      {item.isAiEnhanced && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="outline" className="bg-black/50 text-white border-white/30 text-xs">
                            AI
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content - Simplified for mobile */}
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                        <span className="truncate">{item.artist}</span>
                        <span className="text-xs">{item.style}</span>
                      </div>

                      {/* Stats - Mobile simplified */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}</span>
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ))}
      
      {/* Loading indicator */}
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedGrid;
