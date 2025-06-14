
import { motion } from 'framer-motion';

const GalleryHeader = () => {
  return (
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
  );
};

export default GalleryHeader;
