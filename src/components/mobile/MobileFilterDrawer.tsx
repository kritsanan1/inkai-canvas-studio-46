
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  User,
  Palette
} from 'lucide-react';
import { FilterState } from '@/types/gallery';
import { motion } from 'framer-motion';

interface MobileFilterDrawerProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
}

const MobileFilterDrawer = ({ filters, onFiltersChange }: MobileFilterDrawerProps) => {
  const [openSections, setOpenSections] = useState({
    style: true,
    bodyPart: false,
    colors: false,
  });

  const styles = ['Traditional', 'Geometric', 'Minimalist', 'Blackwork', 'Watercolor', 'Tribal', 'Realism', 'Japanese'];
  const bodyParts = ['Arm', 'Back', 'Chest', 'Leg', 'Shoulder', 'Wrist', 'Ankle', 'Neck'];
  const colorSchemes = ['Black & Grey', 'Full Color', 'Red', 'Blue', 'Green', 'Purple', 'Orange', 'Monochrome'];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange((prev: FilterState) => ({ ...prev, ...updates }));
  };

  const toggleArrayFilter = (array: string[], value: string, key: keyof FilterState) => {
    const newArray = array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
    updateFilters({ [key]: newArray });
  };

  const clearAllFilters = () => {
    updateFilters({
      styles: [],
      bodyParts: [],
      colors: [],
      artists: [],
      searchQuery: '',
      isAiOnly: false,
      sortBy: 'recent'
    });
  };

  const activeFilterCount = filters.styles.length + filters.bodyParts.length + filters.colors.length + (filters.isAiOnly ? 1 : 0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="md:hidden relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-4">
          <DrawerTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto flex-1">
          {/* Sort */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as FilterState['sortBy'] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Style Filter */}
          <Collapsible open={openSections.style} onOpenChange={() => toggleSection('style')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg mb-2">
              <span className="font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Style ({filters.styles.length})
              </span>
              {openSections.style ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div 
                className="grid grid-cols-2 gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {styles.map(style => (
                  <div key={style} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                    <Checkbox
                      checked={filters.styles.includes(style)}
                      onCheckedChange={() => toggleArrayFilter(filters.styles, style, 'styles')}
                    />
                    <label className="text-sm cursor-pointer flex-1">{style}</label>
                  </div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          {/* Body Part Filter */}
          <Collapsible open={openSections.bodyPart} onOpenChange={() => toggleSection('bodyPart')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg mb-2">
              <span className="font-medium flex items-center">
                <User className="w-4 h-4 mr-2" />
                Body Part ({filters.bodyParts.length})
              </span>
              {openSections.bodyPart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div 
                className="grid grid-cols-2 gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {bodyParts.map(part => (
                  <div key={part} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                    <Checkbox
                      checked={filters.bodyParts.includes(part)}
                      onCheckedChange={() => toggleArrayFilter(filters.bodyParts, part, 'bodyParts')}
                    />
                    <label className="text-sm cursor-pointer flex-1">{part}</label>
                  </div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          {/* Color Scheme Filter */}
          <Collapsible open={openSections.colors} onOpenChange={() => toggleSection('colors')}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg mb-2">
              <span className="font-medium flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Colors ({filters.colors.length})
              </span>
              {openSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <motion.div 
                className="grid grid-cols-2 gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {colorSchemes.map(color => (
                  <div key={color} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                    <Checkbox
                      checked={filters.colors.includes(color)}
                      onCheckedChange={() => toggleArrayFilter(filters.colors, color, 'colors')}
                    />
                    <label className="text-sm cursor-pointer flex-1">{color}</label>
                  </div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Toggle */}
          <div className="p-4 bg-muted/30 rounded-lg mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={filters.isAiOnly}
                onCheckedChange={(checked) => updateFilters({ isAiOnly: !!checked })}
              />
              <label className="text-sm font-medium">AI-Generated Only</label>
            </div>
          </div>
        </div>

        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button className="w-full">Apply Filters</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
