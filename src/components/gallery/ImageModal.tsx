
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Sparkles,
  Palette,
  User,
  Eye
} from 'lucide-react';
import { GalleryItem } from '@/types/gallery';
import { useAppStore } from '@/stores/useAppStore';

interface ImageModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

const ImageModal = ({ 
  item, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext, 
  showNavigation = false 
}: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const { addToFavorites, removeFromFavorites, favorites } = useAppStore();

  const isFavorite = item ? favorites.includes(item.id) : false;

  useEffect(() => {
    setZoom(1);
    setShowBeforeAfter(false);
    setSliderPosition(50);
  }, [item]);

  if (!item) return null;

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item.id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this amazing tattoo design: ${item.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Image Section */}
          <div className="flex-1 relative bg-black/90 flex items-center justify-center">
            {/* Navigation */}
            {showNavigation && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={onPrevious}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                  onClick={onNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Image Container */}
            <div 
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoom})` }}
            >
              {showBeforeAfter && item.beforeImage && item.afterImage ? (
                // Before/After Slider
                <div className="relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.beforeImage}
                      alt={`${item.title} - Before`}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                    <div 
                      className="absolute top-0 left-0 overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={item.afterImage}
                        alt={`${item.title} - After`}
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                    </div>
                  </div>
                  {/* Slider Control */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={(e) => {
                      const handleMouseMove = (e: MouseEvent) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = (x / rect.width) * 100;
                        setSliderPosition(Math.max(0, Math.min(100, percentage)));
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                      }, { once: true });
                    }}
                  />
                </div>
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Info Panel */}
          <div className="w-96 bg-card p-6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{item.title}</DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {item.artist}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {item.views}
                </span>
              </div>
            </DialogHeader>

            {/* Action Buttons */}
            <div className="flex space-x-2 my-4">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={handleFavorite}
                className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Before/After Toggle */}
            {item.beforeImage && item.afterImage && (
              <Button
                variant="outline"
                className="w-full mb-4"
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              >
                {showBeforeAfter ? 'Show Final Design' : 'Show Before/After'}
              </Button>
            )}

            {/* Tags */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Metadata */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Design Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Style:</span>
                    <span>{item.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Body Part:</span>
                    <span>{item.bodyPart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Enhanced:</span>
                    <span>{item.isAiEnhanced ? 'Yes' : 'No'}</span>
                  </div>
                  {item.isAiEnhanced && (
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span>{item.metadata.processingTime}s</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Color Palette
                </h4>
                <div className="flex space-x-2">
                  {item.metadata.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded border-2 border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              {item.processSteps.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Process Steps
                  </h4>
                  <div className="space-y-2">
                    {item.processSteps.map((step, index) => (
                      <div key={step.id} className="p-3 bg-muted/30 rounded">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{step.name}</span>
                          <Badge variant={step.aiInvolved ? "default" : "outline"} className="text-xs">
                            {step.aiInvolved ? 'AI' : 'Manual'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{step.description}</p>
                        <span className="text-xs text-muted-foreground">{step.duration}min</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Features */}
            <Separator className="my-4" />
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="w-4 h-4 mr-2" />
                Find Similar Designs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Palette className="w-4 h-4 mr-2" />
                See in Different Styles
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-2" />
                You Might Also Like
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
