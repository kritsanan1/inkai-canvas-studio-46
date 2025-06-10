
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

interface MasonryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
  loading?: boolean;
}

const MasonryGrid = ({ items, onItemClick, loading = false }: MasonryGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [columns, setColumns] = useState(4);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToFavorites, removeFromFavorites, favorites } = useAppStore();

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) setColumns(5);
      else if (window.innerWidth >= 1024) setColumns(4);
      else if (window.innerWidth >= 768) setColumns(3);
      else if (window.innerWidth >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

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

  const handleShare = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this amazing tattoo design: ${item.title}`,
        url: window.location.href
      });
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
    
    items.forEach((item, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(item);
    });
    
    return columnArrays;
  };

  const columnArrays = distributeItems();

  return (
    <div 
      ref={gridRef}
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {columnArrays.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="space-y-4">
          {columnItems.map((item, itemIndex) => {
            const isLoaded = loadedImages.has(item.id);
            const isFavorite = favorites.includes(item.id);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: (columnIndex * 0.1) + (itemIndex * 0.05) 
                }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
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
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                          onClick={(e) => handleFavorite(e, item)}
                        >
                          <Heart 
                            className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                          onClick={(e) => handleDownload(e, item)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                          onClick={(e) => handleShare(e, item)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-secondary to-accent text-black">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}

                      {/* AI Badge */}
                      {item.isAiEnhanced && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                            AI Enhanced
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{item.artist}</span>
                        <span>{item.style}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-border/30">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-border/30">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>{item.downloads}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}</span>
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <MoreHorizontal className="w-4 h-4" />
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
      
      {/* Loading Skeleton */}
      {loading && (
        <div className="col-span-full grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <Card key={itemIndex} className="overflow-hidden">
                  <div className="aspect-square bg-muted/20 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted/30 rounded animate-pulse" />
                    <div className="h-3 bg-muted/20 rounded animate-pulse w-2/3" />
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;
