'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface InfiniteGalleryProps {
  images: string[];
  title: string;
  description: string;
}

export default function InfiniteGallery({ images, title, description }: InfiniteGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Preload all images once when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      console.log('Starting preload for images:', images);
      
      // Test URLs with fetch first
      console.log('Testing image URLs with fetch...');
      for (let i = 0; i < images.length; i++) {
        const src = images[i];
        try {
          const response = await fetch(src, { method: 'HEAD' });
          console.log(`Fetch test ${i + 1} (${src}):`, response.ok ? '✅ OK' : `❌ ${response.status}`);
        } catch (error) {
          console.error(`Fetch test ${i + 1} (${src}): ❌ Failed`, error);
        }
      }
      
      const loadPromises = images.map((src, index) => {
        return new Promise<{ src: string; index: number; success: boolean }>((resolve) => {
          const img = new window.Image();
          
          img.onload = () => {
            console.log(`✅ Successfully loaded image ${index + 1}:`, src);
            setPreloadedImages(prev => new Set(prev).add(src));
            setImageLoadStates(prev => ({ ...prev, [src]: 'loaded' }));
            resolve({ src, index, success: true });
          };
          
          img.onerror = (error) => {
            console.error(`❌ Failed to load image ${index + 1}:`, src);
            console.error('Error details:', error);
            console.error('Image object:', img);
            console.error('Current src:', img.src);
            setImageLoadStates(prev => ({ ...prev, [src]: 'error' }));
            resolve({ src, index, success: false });
          };
          
          img.src = src;
        });
      });

      try {
        const results = await Promise.allSettled(loadPromises);
        const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failed = results.filter(r => r.status === 'fulfilled' && !r.value.success).length;
        
        console.log(`Preloading complete: ${successful} successful, ${failed} failed`);
        
        // Log specific failures
        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && !result.value.success) {
            console.error(`Image ${result.value.index + 1} failed:`, result.value.src);
          }
        });
      } catch (error) {
        console.error('Preloading error:', error);
      }
    };

    preloadImages();
  }, [images]);

  // Triple the images for seamless infinite scroll - use stable keys
  const tripleImages = [
    ...images.map((img, i) => ({ src: img, originalIndex: i, setIndex: 0 })),
    ...images.map((img, i) => ({ src: img, originalIndex: i, setIndex: 1 })),
    ...images.map((img, i) => ({ src: img, originalIndex: i, setIndex: 2 }))
  ];
  const startIndex = images.length; // Start at the middle set

  const scrollToIndex = (index: number, smooth: boolean = true) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const imageWidth = container.offsetWidth / 3.5; // Show 3.5 images
      const scrollPosition = index * imageWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };


  // Initialize scroll position
  useEffect(() => {
    setCurrentIndex(startIndex);
    setTimeout(() => scrollToIndex(startIndex, false), 100);
  }, [startIndex]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    setCurrentIndex(prev => {
      let nextIndex;
      if (direction === 'right') {
        nextIndex = prev + 1;
        if (nextIndex >= images.length * 2) {
          nextIndex = startIndex;
        }
      } else {
        nextIndex = prev - 1;
        if (nextIndex < startIndex) {
          nextIndex = images.length * 2 - 1;
        }
      }
      
      scrollToIndex(nextIndex);
      return nextIndex;
    });
  };

  const handleImageClick = (imageData: { src: string; originalIndex: number }) => {
    setFullscreenImage(imageData.src);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreenImage) {
        closeFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-medium text-[#1d1d1f] tracking-tight">
            {title}.
          </h3>
          <p className="text-3xl text-gray-600">
            {description}.
          </p>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => handleManualScroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleManualScroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {tripleImages.map((imageData, index) => {
            const isLoaded = imageLoadStates[imageData.src] === 'loaded';
            const hasError = imageLoadStates[imageData.src] === 'error';
            
            return (
              <div
                key={`${imageData.originalIndex}-${imageData.setIndex}`} // Stable key based on position, not src
                className="flex-shrink-0 w-[calc(100vw/3.5-1rem)] md:w-[calc(100%/3.5-1rem)] aspect-[4/5] relative cursor-pointer group/item"
                onClick={() => handleImageClick(imageData)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl">
                  {/* Loading state */}
                  {!isLoaded && !hasError && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Error state */}
                  {hasError && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-2xl mb-2">📷</div>
                        <div className="text-sm">Image {imageData.originalIndex + 1}</div>
                        <div className="text-xs mt-1">Failed to load</div>
                      </div>
                    </div>
                  )}

                  {/* Actual image - only render if preloaded or loaded */}
                  {(preloadedImages.has(imageData.src) || isLoaded) && (
                    <Image
                      src={imageData.src}
                      alt={`${title} image ${imageData.originalIndex + 1}`}
                      fill
                      className={`object-cover gallery-image ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={index < 6} // Prioritize first 6 visible images
                      // Remove onLoad/onError since we're handling preloading separately
                    />
                  )}
                  
                  {/* Overlay gradient - only show when image is loaded */}
                  {isLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  {/* Image number indicator - only show when image is loaded */}
                  {isLoaded && (
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-[#1d1d1f] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      {imageData.originalIndex + 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                (currentIndex % images.length) === index
                  ? 'bg-[#1d1d1f] w-6'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={fullscreenImage}
              alt="Fullscreen image"
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}