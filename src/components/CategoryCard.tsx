'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CategoryCardProps {
  category: {
    key: string;
    href: string;
    image: string;
  };
  name: string;
  index: number;
  shouldReveal: boolean;
}

export default function CategoryCard({ category, name, index, shouldReveal }: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={category.href} className="group">
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
        {/* Preloaded image - always rendering but hidden until reveal */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={name}
            fill
            priority
            className="object-cover sepia group-hover:sepia-0 transition-all duration-500"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        </div>

        {/* Fade-in overlay that reveals the image */}
        <div 
          className={`absolute inset-0 bg-[#f5f5f7] transition-all duration-800 ease-out ${
            shouldReveal && imageLoaded ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
          }`}
          style={{
            transitionDelay: `${index * 150}ms`
          }}
        />

        {/* Loading state for unloaded images */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image unavailable</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        
        {/* Category name */}
        <div 
          className={`absolute bottom-8 left-8 z-20 transition-all duration-600 ease-out ${
            shouldReveal && imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 150 + 300}ms`
          }}
        >
          <h3 className="text-2xl font-medium text-white tracking-tight drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}