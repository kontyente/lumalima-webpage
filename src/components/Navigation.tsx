'use client';

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  activeRoute?: string;
}

export default function Navigation({ activeRoute }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <header className="w-full py-8 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-semibold text-[#1d1d1f] tracking-tight hover:text-gray-600 transition-colors">
          Lumalima
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-[#1d1d1f] hover:text-gray-600 transition-colors ${
              activeRoute === 'home' ? 'font-medium' : ''
            }`}
          >
            {t('nav.solutions')}
          </Link>
          <Link
            href="/about"
            className={`text-[#1d1d1f] hover:text-gray-600 transition-colors ${
              activeRoute === 'about' ? 'font-medium' : ''
            }`}
          >
            {t('nav.about')}
          </Link>
          <Link
            href="/services"
            className={`text-[#1d1d1f] hover:text-gray-600 transition-colors ${
              activeRoute === 'services' ? 'font-medium' : ''
            }`}
          >
            {t('nav.services')}
          </Link>
          <Link
            href="/contact"
            className={`text-[#1d1d1f] hover:text-gray-600 transition-colors ${
              activeRoute === 'contact' ? 'font-medium' : ''
            }`}
          >
            {t('nav.contact')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}