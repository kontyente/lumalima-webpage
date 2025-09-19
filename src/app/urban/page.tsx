'use client';

import Navigation from "@/components/Navigation";
import InfiniteGallery from "@/components/InfiniteGallery";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Generate street image paths
const streetImages = Array.from({ length: 12 }, (_, i) => `/assets/streets/${i + 1}.jpg`);

// Generate bridge image paths
const bridgeImages = Array.from({ length: 6 }, (_, i) => `/assets/bridges/${i + 1}.jpg`);

// Generate plaza image paths
const plazaImages = Array.from({ length: 8 }, (_, i) => `/assets/plazas/${i + 1}.jpg`);

// Debug: log the generated paths
console.log('Generated urban image paths:', { streetImages, bridgeImages, plazaImages });

export default function Urban() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('urban.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('urban.subtitle')}
            </p>
            <p className="text-xl leading-relaxed">
              {t('urban.description')}
            </p>
          </div>

          {/* Sub-categories with galleries */}
          <div className="space-y-20">
            {/* Streets Gallery */}
            <InfiniteGallery
              images={streetImages}
              title={t('urban.streets')}
              description={t('urban.streets.desc')}
            />

            {/* Bridges Gallery */}
            <InfiniteGallery
              images={bridgeImages}
              title={t('urban.bridges')}
              description={t('urban.bridges.desc')}
            />

            {/* Plazas Gallery */}
            <InfiniteGallery
              images={plazaImages}
              title={t('urban.plazas')}
              description={t('urban.plazas.desc')}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}