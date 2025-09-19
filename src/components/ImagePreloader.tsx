'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImagePreloaderProps {
  images: string[];
  onComplete: () => void;
}

export default function ImagePreloader({ images, onComplete }: ImagePreloaderProps) {
  const { t, language } = useLanguage();
  const [loadedCount, setLoadedCount] = useState(0);
  const [progress, setProgress] = useState(0);

  // Fallback text in case translations aren't ready
  const getLoadingText = () => {
    try {
      return t('home.loading');
    } catch {
      return language === 'pt' ? 'A carregar iluminação...' : 
             language === 'de' ? 'Beleuchtung wird geladen...' : 
             'Loading illumination...';
    }
  };

  const getImagesText = () => {
    try {
      return t('preloader.loading');
    } catch {
      return language === 'pt' ? 'imagens carregadas' : 
             language === 'de' ? 'Bilder geladen' : 
             'images loaded';
    }
  };

  useEffect(() => {
    if (images.length === 0) {
      onComplete();
      return;
    }

    let loaded = 0;
    
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          setProgress((loaded / images.length) * 100);
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(images.map(preloadImage))
      .then(() => {
        setTimeout(onComplete, 300);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        onComplete();
      });
  }, [images, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#f5f5f7] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-[#1d1d1f] mb-4 tracking-tight">
            Lumalima
          </h1>
          <p className="text-gray-600">{getLoadingText()}</p>
        </div>
        
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1d1d1f] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          {loadedCount} of {images.length} {getImagesText()}
        </p>
      </div>
    </div>
  );
}