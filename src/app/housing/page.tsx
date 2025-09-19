'use client';

import Navigation from "@/components/Navigation";
import InfiniteGallery from "@/components/InfiniteGallery";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Generate residential image paths
const residentialImages = Array.from({ length: 17 }, (_, i) => `/assets/residential/${i + 1}.jpg`);

// Generate residential image paths
const eventsImages = Array.from({ length: 7 }, (_, i) => `/assets/events/${i + 1}.jpg`);

// Generate residential image paths
const gardensImages = Array.from({ length: 17 }, (_, i) => `/assets/gardens/${i + 1}.jpg`);

// Debug: log the generated paths
console.log('Generated housing image paths:', residentialImages);

export default function Housing() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('housing.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('housing.subtitle')}
            </p>
            <p className="text-xl leading-relaxed">
              {t('housing.description')}
            </p>
          </div>
{/* 
          <div className="prose prose-lg mx-auto text-gray-700 mb-16">
            <p className="text-xl leading-relaxed">
              {t('housing.description')}
            </p>
          </div> */}

          {/* Sub-categories with galleries */}
          <div className="space-y-20">
            {/* Residential Gallery - using all 17 housing images */}
            <InfiniteGallery
              images={residentialImages}
              title={t('housing.residential')}
              description={t('housing.residential.desc')}
            />

            <InfiniteGallery
              images={gardensImages}
              title={t('housing.gardens')}
              description={t('housing.gardens.desc')}
            />

            <InfiniteGallery
              images={eventsImages}
              title={t('housing.events')}
              description={t('housing.events.desc')}
            />

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}