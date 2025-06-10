import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  url: string;
}

interface SearchBarProps {
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ 
  placeholder = "Search designs, artists, styles...", 
  suggestions = [],
  onSearch,
  className = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Default suggestions for demo
  const defaultSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Dragon Tattoo Designs', category: 'Styles', url: '/gallery?style=dragon' },
    { id: '2', title: 'Minimalist Tattoos', category: 'Styles', url: '/gallery?style=minimalist' },
    { id: '3', title: 'Traditional Japanese', category: 'Styles', url: '/gallery?style=japanese' },
    { id: '4', title: 'Geometric Patterns', category: 'Styles', url: '/gallery?style=geometric' },
    { id: '5', title: 'Sarah Chen', category: 'Artists', url: '/artists/sarah-chen' },
    { id: '6', title: 'Marcus Rodriguez', category: 'Artists', url: '/artists/marcus' },
    { id: '7', title: 'Create New Design', category: 'Actions', url: '/create-design' },
    { id: '8', title: 'Browse Gallery', category: 'Actions', url: '/gallery' },
  ];

  const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(
        suggestion =>
          suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query, allSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsOpen(false);
    // Navigate to suggestion URL
    window.location.href = suggestion.url;
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/30 focus:border-primary/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-lg border border-border/20 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors group ${
                  index === selectedIndex ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {suggestion.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {suggestion.category}
                    </div>
                  </div>
                  <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;