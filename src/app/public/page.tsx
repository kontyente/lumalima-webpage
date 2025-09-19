'use client';

import Navigation from "@/components/Navigation";
import InfiniteGallery from "@/components/InfiniteGallery";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Generate museum image paths
const museumImages = Array.from({ length: 8 }, (_, i) => `/assets/museums/${i + 1}.jpg`);

// Generate library image paths
const libraryImages = Array.from({ length: 6 }, (_, i) => `/assets/libraries/${i + 1}.jpg`);

// Generate park image paths
const parkImages = Array.from({ length: 10 }, (_, i) => `/assets/parks/${i + 1}.jpg`);

// Debug: log the generated paths
console.log('Generated public image paths:', { museumImages, libraryImages, parkImages });

export default function Public() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('public.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('public.subtitle')}
            </p>
            <p className="text-xl leading-relaxed">
              {t('public.description')}
            </p>
          </div>

          {/* Sub-categories with galleries */}
          <div className="space-y-20">
            {/* Museums Gallery */}
            <InfiniteGallery
              images={museumImages}
              title={t('public.museums')}
              description={t('public.museums.desc')}
            />

            {/* Libraries Gallery */}
            <InfiniteGallery
              images={libraryImages}
              title={t('public.libraries')}
              description={t('public.libraries.desc')}
            />

            {/* Parks Gallery */}
            <InfiniteGallery
              images={parkImages}
              title={t('public.parks')}
              description={t('public.parks.desc')}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}