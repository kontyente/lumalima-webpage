'use client';

import Navigation from "@/components/Navigation";
import InfiniteGallery from "@/components/InfiniteGallery";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Generate retail image paths
const retailImages = Array.from({ length: 10 }, (_, i) => `/assets/retail/${i + 1}.jpg`);

// Generate office image paths
const officeImages = Array.from({ length: 8 }, (_, i) => `/assets/offices/${i + 1}.jpg`);

// Generate hospitality image paths
const hospitalityImages = Array.from({ length: 12 }, (_, i) => `/assets/hospitality/${i + 1}.jpg`);

// Debug: log the generated paths
console.log('Generated comercial image paths:', { retailImages, officeImages, hospitalityImages });

export default function Comercial() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('comercial.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('comercial.subtitle')}
            </p>
            <p className="text-xl leading-relaxed">
              {t('comercial.description')}
            </p>
          </div>

          {/* Sub-categories with galleries */}
          <div className="space-y-20">
            {/* Retail Gallery */}
            <InfiniteGallery
              images={retailImages}
              title={t('comercial.retail')}
              description={t('comercial.retail.desc')}
            />

            {/* Offices Gallery */}
            <InfiniteGallery
              images={officeImages}
              title={t('comercial.offices')}
              description={t('comercial.offices.desc')}
            />

            {/* Hospitality Gallery */}
            <InfiniteGallery
              images={hospitalityImages}
              title={t('comercial.hospitality')}
              description={t('comercial.hospitality.desc')}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}