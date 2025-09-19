'use client';

import Link from "next/link";
import { useState } from "react";
import CategoryCard from "@/components/CategoryCard";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ImagePreloader from "@/components/ImagePreloader";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { key: "housing", href: "/housing", image: "/assets/housing_main.jpg" },
  { key: "comercial", href: "/comercial", image: "/assets/comercial_main.jpg" },
  { key: "public", href: "/public", image: "/assets/public_main.png" },
  { key: "urban", href: "/urban", image: "/assets/urban_main.jpg" },
];

export default function Home() {
  const { t } = useLanguage();
  const [isPreloading, setIsPreloading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [shouldRevealImages, setShouldRevealImages] = useState(false);

  const handlePreloadComplete = () => {
    setIsPreloading(false);
    
    // Trigger content animation after preloading completes
    const contentTimer = setTimeout(() => setShowContent(true), 100);
    
    // Start image reveal after header and title are visible
    const imageTimer = setTimeout(() => setShouldRevealImages(true), 800);
    
    // Cleanup timers if component unmounts
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(imageTimer);
    };
  };

  if (isPreloading) {
    return (
      <ImagePreloader
        images={categories.map(cat => cat.image)}
        onComplete={handlePreloadComplete}
      />
    );
  }
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header 
        className={`w-full py-8 px-6 transition-all duration-700 ease-out relative ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
            Lumalima
          </h1>
          <nav className="flex items-center gap-6 relative" style={{ zIndex: 1001 }}>
            <Link href="/about" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/services" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/contact" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <main className="w-full px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-5xl font-light text-[#1d1d1f] mb-4 tracking-tight">
              {t('home.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.key}
                category={category}
                name={t(`category.${category.key}`)}
                index={index}
                shouldReveal={shouldRevealImages}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
