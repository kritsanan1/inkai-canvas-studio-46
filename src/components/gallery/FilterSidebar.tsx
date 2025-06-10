
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Save, 
  Filter,
  Palette,
  User,
  Sparkles,
  Calendar
} from 'lucide-react';
import { FilterState, FilterPreset } from '@/types/gallery';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onToggle }: FilterSidebarProps) => {
  const [openSections, setOpenSections] = useState({
    style: true,
    bodyPart: true,
    colors: true,
    artist: false,
    advanced: false
  });

  const styles = ['Traditional', 'Geometric', 'Minimalist', 'Blackwork', 'Watercolor', 'Tribal', 'Realism', 'Japanese'];
  const bodyParts = ['Arm', 'Back', 'Chest', 'Leg', 'Shoulder', 'Wrist', 'Ankle', 'Neck'];
  const colorSchemes = ['Black & Grey', 'Full Color', 'Red', 'Blue', 'Green', 'Purple', 'Orange', 'Monochrome'];
  const artists = ['AI Studio', 'Marcus Chen', 'Sarah Kim', 'Diego Rodriguez', 'Emma Wilson'];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleArrayFilter = (array: string[], value: string, key: keyof FilterState) => {
    const newArray = array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
    updateFilters({ [key]: newArray });
  };

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'style':
        updateFilters({ styles: filters.styles.filter(s => s !== value) });
        break;
      case 'bodyPart':
        updateFilters({ bodyParts: filters.bodyParts.filter(s => s !== value) });
        break;
      case 'color':
        updateFilters({ colors: filters.colors.filter(s => s !== value) });
        break;
      case 'artist':
        updateFilters({ artists: filters.artists.filter(s => s !== value) });
        break;
    }
  };

  const clearAllFilters = () => {
    updateFilters({
      styles: [],
      bodyParts: [],
      colors: [],
      artists: [],
      searchQuery: '',
      isAiOnly: false,
      sortBy: 'recent',
      minLikes: undefined,
      dateRange: undefined
    });
  };

  const activeFilterCount = filters.styles.length + filters.bodyParts.length + 
    filters.colors.length + filters.artists.length + (filters.isAiOnly ? 1 : 0);

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="fixed top-24 left-4 z-40 lg:hidden"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </Button>
    );
  }

  return (
    <div className="w-80 bg-card/50 backdrop-blur-sm border-r border-border/30 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.styles.map(style => (
              <Badge key={style} variant="default" className="cursor-pointer">
                {style}
                <X className="w-3 h-3 ml-1" onClick={() => removeFilter('style', style)} />
              </Badge>
            ))}
            {filters.bodyParts.map(part => (
              <Badge key={part} variant="default" className="cursor-pointer">
                {part}
                <X className="w-3 h-3 ml-1" onClick={() => removeFilter('bodyPart', part)} />
              </Badge>
            ))}
            {filters.colors.map(color => (
              <Badge key={color} variant="default" className="cursor-pointer">
                {color}
                <X className="w-3 h-3 ml-1" onClick={() => removeFilter('color', color)} />
              </Badge>
            ))}
            {filters.artists.map(artist => (
              <Badge key={artist} variant="default" className="cursor-pointer">
                {artist}
                <X className="w-3 h-3 ml-1" onClick={() => removeFilter('artist', artist)} />
              </Badge>
            ))}
            {filters.isAiOnly && (
              <Badge variant="default" className="cursor-pointer">
                AI Only
                <X className="w-3 h-3 ml-1" onClick={() => updateFilters({ isAiOnly: false })} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search designs..."
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          className="bg-input/50 border-border/30"
        />
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as any })}>
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
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded">
          <span className="font-medium flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Style
          </span>
          {openSections.style ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {styles.map(style => (
            <div key={style} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.styles.includes(style)}
                onCheckedChange={() => toggleArrayFilter(filters.styles, style, 'styles')}
              />
              <label className="text-sm cursor-pointer flex-1">{style}</label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Body Part Filter */}
      <Collapsible open={openSections.bodyPart} onOpenChange={() => toggleSection('bodyPart')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded mt-4">
          <span className="font-medium flex items-center">
            <User className="w-4 h-4 mr-2" />
            Body Part
          </span>
          {openSections.bodyPart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {bodyParts.map(part => (
            <div key={part} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.bodyParts.includes(part)}
                onCheckedChange={() => toggleArrayFilter(filters.bodyParts, part, 'bodyParts')}
              />
              <label className="text-sm cursor-pointer flex-1">{part}</label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Color Scheme Filter */}
      <Collapsible open={openSections.colors} onOpenChange={() => toggleSection('colors')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/50 rounded mt-4">
          <span className="font-medium flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Color Scheme
          </span>
          {openSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          {colorSchemes.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleArrayFilter(filters.colors, color, 'colors')}
              />
              <label className="text-sm cursor-pointer flex-1">{color}</label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* AI Toggle */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={filters.isAiOnly}
            onCheckedChange={(checked) => updateFilters({ isAiOnly: !!checked })}
          />
          <label className="text-sm font-medium">AI-Generated Only</label>
        </div>
      </div>

      {/* Save Preset */}
      <Button variant="outline" className="w-full mt-6">
        <Save className="w-4 h-4 mr-2" />
        Save Filter Preset
      </Button>
    </div>
  );
};

export default FilterSidebar;
