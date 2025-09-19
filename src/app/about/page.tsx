'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation activeRoute="about" />

      <main className="w-full px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {t('about.subtitle')}
            </p>
          </div>

          {/* About Us Image */}
          <div className="mb-16">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/assets/about_us.jpg"
                alt="About Lumalima"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="prose prose-lg mx-auto text-gray-700 mb-16">
            <p className="text-xl leading-relaxed mb-8">
              {t('about.description1')}
            </p>
            
            <p className="leading-relaxed mb-8">
              {t('about.description2')}
            </p>

            <p className="leading-relaxed mb-8">
              {t('about.description3')}
            </p>

            <p className="leading-relaxed">
              {t('about.description4')}
            </p>
          </div>

          {/* Team Section */}
          <div className="space-y-12">
            <h3 className="text-3xl font-medium text-[#1d1d1f] tracking-tight">
              {t('about.team.title')}
            </h3>
            
            {/* Raquel Contente */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Profile Image */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="/assets/rc_profile.jpg"
                        alt="Raquel Contente - Founder"
                        fill
                        className="object-cover profile-image"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="md:col-span-2 space-y-6 text-gray-700">
                    <div>
                      <h4 className="text-2xl font-medium text-[#1d1d1f] mb-2 tracking-tight">
                        Raquel Contente
                      </h4>
                      <p className="text-lg text-gray-600 mb-4">{t('about.raquel.role')}</p>
                    </div>
                    
                    <p className="text-lg leading-relaxed">
                      {t('about.raquel.intro')}
                    </p>
                    
                    <p className="leading-relaxed">
                      {t('about.raquel.experience')}
                    </p>
                    
                    <p className="leading-relaxed">
                      {t('about.raquel.approach')}
                    </p>
                    
                    <blockquote className="border-l-4 border-[#1d1d1f] pl-6 italic text-lg">
                      <p className="mb-2">{t('about.raquel.quote1')}</p>
                      <p>{t('about.raquel.quote2')}</p>
                    </blockquote>
                    
                    {/* LinkedIn Profile */}
                    <div className="mt-6">
                      <a 
                        href="https://www.linkedin.com/in/raquel-contente-02a0b3228/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0077b5] hover:text-[#005885] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </div>
                    
                    {/* Calendly Booking */}
                    <div className="mt-8">
                      <h5 className="text-lg font-medium text-[#1d1d1f] mb-4">
                        {t('about.raquel.booking')}
                      </h5>
                      <div className="bg-gray-50 rounded-2xl p-1">
                        <iframe
                          src="https://calendly.com/lumalima/30min"
                          width="100%"
                          height="630"
                          title="Schedule a meeting with Raquel"
                          className="rounded-xl border-0"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Christian Nascimento */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Profile Image */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src="/assets/cn_profile.jpg"
                        alt="Christian Nascimento - Lighting Designer"
                        fill
                        className="object-cover profile-image"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="md:col-span-2 space-y-6 text-gray-700">
                    <div>
                      <h4 className="text-2xl font-medium text-[#1d1d1f] mb-2 tracking-tight">
                        Christian Nascimento
                      </h4>
                      <p className="text-lg text-gray-600 mb-4">{t('about.christian.role')}</p>
                    </div>
                    
                    <p className="text-lg leading-relaxed">
                      {t('about.christian.intro')}
                    </p>
                    
                    <p className="leading-relaxed">
                      {t('about.christian.experience')}
                    </p>
                    
                    <p className="leading-relaxed">
                      {t('about.christian.achievements')}
                    </p>
                    
                    <blockquote className="border-l-4 border-[#1d1d1f] pl-6 italic text-lg">
                      <p>{t('about.christian.quote')}</p>
                    </blockquote>
                    
                    {/* LinkedIn Profile */}
                    <div className="mt-6">
                      <a 
                        href="https://www.linkedin.com/in/cristhiannascimento/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0077b5] hover:text-[#005885] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}