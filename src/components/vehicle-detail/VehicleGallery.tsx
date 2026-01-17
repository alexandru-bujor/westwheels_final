import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Car } from '@/data/cars';

interface VehicleGalleryProps {
  car: Car;
  currentImage: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onImageSelect: (index: number) => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const VehicleGallery = ({
  car,
  currentImage,
  onPrevImage,
  onNextImage,
  onImageSelect,
  isFavorite,
  onFavoriteToggle,
}: VehicleGalleryProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(currentImage);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(false);

  // Update full screen image index when currentImage changes
  useEffect(() => {
    setFullScreenImageIndex(currentImage);
  }, [currentImage]);

  // Handle keyboard navigation in full screen
  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = fullScreenImageIndex === 0 ? car.images.length - 1 : fullScreenImageIndex - 1;
        setFullScreenImageIndex(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = fullScreenImageIndex === car.images.length - 1 ? 0 : fullScreenImageIndex + 1;
        setFullScreenImageIndex(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, fullScreenImageIndex, car.images.length]);

  const openFullScreen = (index: number) => {
    setFullScreenImageIndex(index);
    setIsFullScreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    document.body.style.overflow = '';
  };

  const handleFullScreenPrev = () => {
    const prevIndex = fullScreenImageIndex === 0 ? car.images.length - 1 : fullScreenImageIndex - 1;
    setFullScreenImageIndex(prevIndex);
  };

  const handleFullScreenNext = () => {
    const nextIndex = fullScreenImageIndex === car.images.length - 1 ? 0 : fullScreenImageIndex + 1;
    setFullScreenImageIndex(nextIndex);
  };

  // Drag handlers for image switching
  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
    setIsDragging(true);
    setHasSwitched(false);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart === null || !isDragging || hasSwitched) return;
    
    const deltaX = clientX - dragStart;
    const threshold = 50; // Minimum drag distance to trigger switch
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Dragged right - show previous image
        handleFullScreenPrev();
      } else {
        // Dragged left - show next image
        handleFullScreenNext();
      }
      setHasSwitched(true);
    }
  };

  const handleDragEnd = () => {
    setDragStart(null);
    setIsDragging(false);
    setHasSwitched(false);
  };

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
          <img
            src={car.images[currentImage]}
            alt={car.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openFullScreen(currentImage)}
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
            {currentImage + 1} / {car.images.length}
          </div>

          {/* Damage Badge */}
          <Badge
            variant={car.damage === 'Clean Title' ? 'default' : 'destructive'}
            className="absolute top-4 left-4"
          >
            {car.damage}
          </Badge>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {car.images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors cursor-pointer ${
                index === currentImage ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${car.title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Full Screen Image Viewer */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center h-full w-full"
            onClick={closeFullScreen}
          >
            {/* Close Button */}
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <motion.img
                key={fullScreenImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={car.images[fullScreenImageIndex]}
                alt={`${car.title} - Image ${fullScreenImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain relative z-0 select-none"
                draggable={false}
              />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullScreenPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors text-white z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullScreenNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors text-white z-20"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm text-white text-sm">
                {fullScreenImageIndex + 1} / {car.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              {car.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{car.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onFavoriteToggle}
              aria-label="Add to favorites"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-primary text-primary' : ''
                }`}
              />
            </Button>
            <Button variant="outline" size="icon" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VehicleGallery;
