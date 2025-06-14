
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MasonryGrid from '@/components/gallery/MasonryGrid';
import { GalleryItem } from '@/types/gallery';

interface GalleryContentProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

const GalleryContent = ({ items, onItemClick }: GalleryContentProps) => {
  return (
    <>
      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <MasonryGrid
          items={items}
          onItemClick={onItemClick}
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
    </>
  );
};

export default GalleryContent;
