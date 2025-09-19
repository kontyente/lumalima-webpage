'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f7] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">
              Lumalima
            </h3>
            <p className="text-gray-600 text-sm max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6">
            <Link href="/about" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/services" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/contact" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('nav.contact')}
            </Link>
            <Link href="/privacy" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-[#1d1d1f] hover:text-gray-600 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-6 border-t border-gray-300 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {currentYear} Lumalima. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}