'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  const servicesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      titleKey: "services.design",
      descKey: "services.design.desc",
      image: "/assets/services/design.jpg"
    },
    {
      titleKey: "services.consultation",
      descKey: "services.consultation.desc",
      image: "/assets/services/consulting.jpg"
    },
    {
      titleKey: "services.installation",
      descKey: "services.installation.desc",
      image: "/assets/services/instalation.jpg"
    },
    {
      titleKey: "services.maintenance",
      descKey: "services.maintenance.desc",
      image: "/assets/services/maintenance.jpg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = servicesRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setIsVisible(prev => {
              const newVisible = [...prev];
              newVisible[index] = entry.isIntersecting;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    servicesRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation activeRoute="services" />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 pt-8">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="space-y-16 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  servicesRefs.current[index] = el;
                }}
                className={`relative bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-700 transform ${
                  isVisible[index]
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`flex flex-col lg:flex-row items-center overflow-hidden rounded-3xl ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}>
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <h3 className="text-3xl font-medium text-[#1d1d1f] mb-6 tracking-tight">
                      {t(service.titleKey)}
                    </h3>
                    <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                      {t(service.descKey)}
                    </div>
                  </div>
                  <div className="lg:w-1/2 relative group">
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{
                          filter: 'sepia(100%) contrast(1.2)',
                          transition: 'filter 0.5s ease, transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'sepia(0%) contrast(1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'sepia(100%) contrast(1.2)';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-[#1d1d1f] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              {t('services.cta')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}