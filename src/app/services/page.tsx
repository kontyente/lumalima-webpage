'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const { t } = useLanguage();
  const services = [
    {
      titleKey: "services.design",
      descKey: "services.design.desc"
    },
    {
      titleKey: "services.consultation", 
      descKey: "services.consultation.desc"
    },
    {
      titleKey: "services.installation",
      descKey: "services.installation.desc"
    },
    {
      titleKey: "services.maintenance",
      descKey: "services.maintenance.desc"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      <main className="w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-3xl font-medium text-[#1d1d1f] mb-6 tracking-tight">
                  {t(service.titleKey)}
                </h3>
                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {t(service.descKey)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/contact" 
              className="inline-block bg-[#1d1d1f] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
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