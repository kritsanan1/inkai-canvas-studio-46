
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Search, 
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FilterState } from '@/types/gallery';
import MobileFilterDrawer from '@/components/mobile/MobileFilterDrawer';
import { useIsMobile } from '@/hooks/use-mobile';

interface GalleryControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

const GalleryControls = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  viewMode,
  setViewMode,
  isFilterOpen,
  setIsFilterOpen
}: GalleryControlsProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className="mb-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:gap-4 md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search designs, styles, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input/50 border-border/30 focus:border-primary/50 h-12 text-base"
          />
        </div>
        
        <div className="flex items-center justify-between md:justify-end space-x-2 md:space-x-4">
          {/* Mobile Filter Drawer */}
          {isMobile ? (
            <MobileFilterDrawer
              filters={filters}
              onFiltersChange={setFilters}
            />
          ) : (
            /* Desktop Filter Toggle */
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}

          {/* Sort */}
          <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as FilterState['sortBy'] }))}>
            <SelectTrigger className="w-32 md:w-40 h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode - Hidden on mobile since we only use grid */}
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => value && setViewMode(value as any)}
            className="hidden md:flex"
          >
            <ToggleGroupItem value="grid" className="h-12 w-12">
              <Grid3X3 className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" className="h-12 w-12">
              <List className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryControls;
