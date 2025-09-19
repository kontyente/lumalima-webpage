'use client';

import { useEffect, useState } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          setLoadedImages(prev => new Set(prev).add(url));
          resolve(url);
        };
        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = url;
      });
    };

    Promise.allSettled(imageUrls.map(preloadImage))
      .then(() => {
        setLoading(false);
      });
  }, [imageUrls]);

  return {
    loading,
    progress,
    loadedImages,
    isImageLoaded: (url: string) => loadedImages.has(url)
  };
};