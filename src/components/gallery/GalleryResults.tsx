
import { TrendingUp, Sparkles } from 'lucide-react';

interface GalleryResultsProps {
  itemCount: number;
}

const GalleryResults = ({ itemCount }: GalleryResultsProps) => {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
      <span>{itemCount} designs found</span>
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
  );
};

export default GalleryResults;
