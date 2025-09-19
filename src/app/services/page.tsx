'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const servicesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      titleKey: "services.design",
      descKey: "services.design.desc",
      image: "/assets/services/design.jpg",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      titleKey: "services.consultation",
      descKey: "services.consultation.desc",
      image: "/assets/services/consulting.jpg",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      titleKey: "services.installation",
      descKey: "services.installation.desc",
      image: "/assets/services/instalation.jpg",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      titleKey: "services.maintenance",
      descKey: "services.maintenance.desc",
      image: "/assets/services/maintenance.jpg",
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7] overflow-hidden">
      <Navigation />

      {/* Hero floating images */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {services.map((service, index) => (
          <div
            key={index}
            className="absolute transition-transform duration-1000 ease-out opacity-10"
            style={{
              transform: `translateY(${scrollY * (0.1 + index * 0.02)}px) rotate(${scrollY * 0.02 * (index % 2 === 0 ? 1 : -1)}deg)`,
              left: `${20 + index * 20}%`,
              top: `${10 + index * 15}%`,
            }}
          >
            <img
              src={service.image}
              alt=""
              className="w-32 h-32 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        ))}
      </div>

      <main className="relative z-10 w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 pt-20">
            <h1
              className="text-6xl font-light text-[#1d1d1f] mb-8 tracking-tight"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              {t('services.title')}
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              {t('services.subtitle')}
            </p>
          </div>

          <div className="space-y-32 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  servicesRefs.current[index] = el;
                }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${service.color} backdrop-blur-sm border border-white/20`}
                style={{
                  transform: `translateX(${index % 2 === 0 ? '-' : ''}${Math.max(0, (scrollY - index * 300) * 0.1)}px)`,
                  opacity: Math.max(0.3, 1 - Math.abs(scrollY - index * 400) / 800),
                }}
              >
                <div className="flex flex-col lg:flex-row items-center min-h-[600px]">
                  <div className={`lg:w-1/2 p-12 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <h3 className="text-4xl font-medium text-[#1d1d1f] mb-8 tracking-tight">
                      {t(service.titleKey)}
                    </h3>
                    <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                      {t(service.descKey)}
                    </div>
                  </div>
                  <div className={`lg:w-1/2 p-8 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div
                      className="relative group"
                      style={{
                        transform: `translateY(${(scrollY - index * 200) * 0.05}px) scale(${1 + Math.sin(scrollY * 0.01 + index) * 0.05})`,
                      }}
                    >
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-80 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>

                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"
                     style={{
                       transform: `translate(${Math.sin(scrollY * 0.01 + index) * 20}px, ${Math.cos(scrollY * 0.01 + index) * 20}px)`,
                     }}
                ></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"
                     style={{
                       transform: `translate(${Math.cos(scrollY * 0.015 + index) * 15}px, ${Math.sin(scrollY * 0.015 + index) * 15}px)`,
                     }}
                ></div>
              </div>
            ))}
          </div>

          <div className="text-center relative z-20">
            <div
              style={{
                transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.05})`,
              }}
            >
              <Link
                href="/contact"
                className="inline-block bg-[#1d1d1f] text-white px-12 py-6 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                {t('services.cta')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}