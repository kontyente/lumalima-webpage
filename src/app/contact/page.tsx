'use client';

// Global reCAPTCHA v3 type declaration
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from 'react';

export default function Contact() {
  const { t, language } = useLanguage();

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== 'undefined' && !window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.onload = () => setRecaptchaLoaded(true);
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };
    loadRecaptcha();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get reCAPTCHA v3 token
      if (!recaptchaLoaded || !window.grecaptcha) {
        throw new Error('reCAPTCHA not loaded');
      }
      
      const recaptchaToken = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
        action: 'contact_form'
      });
      
      console.log('reCAPTCHA v3 token received:', recaptchaToken ? 'Yes' : 'No');
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          language
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server response:', text);
        throw new Error('Server error: Invalid response format');
      }

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(t('contact.form.success'));
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(t('contact.form.error'));
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation activeRoute="contact" />

      <main className="w-full px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-[#1d1d1f] mb-8 tracking-tight">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Office Locations */}
          <div className="mb-16">
            <h2 className="text-3xl font-medium text-[#1d1d1f] mb-8 tracking-tight">
              {t('contact.offices')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Switzerland Office */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-medium text-[#1d1d1f] mb-4 tracking-tight">
                  {t('contact.switzerland')}
                </h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.phone')}</p>
                    <p className="text-gray-600">+41 76 460 86 86</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.email')}</p>
                    <p className="text-gray-600">info@lumalima.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.location')}</p>
                    <p className="text-gray-600">
                      Kloten<br />
                      Switzerland
                    </p>
                  </div>
                </div>
                {/* Switzerland City Light Image */}
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/zurich_light.jpg"
                    alt="Switzerland Office - City Lights"
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover city-light-image"
                    priority
                  />
                </div>
              </div>

              {/* Portugal Office */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-medium text-[#1d1d1f] mb-4 tracking-tight">
                  {t('contact.portugal')}
                </h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.phone')}</p>
                    <p className="text-gray-600">+41 76 460 86 86</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.email')}</p>
                    <p className="text-gray-600">info@lumalima.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-[#1d1d1f]">{t('contact.location')}</p>
                    <p className="text-gray-600">
                      Caldas da Rainha<br />
                      Portugal
                    </p>
                  </div>
                </div>
                {/* Portugal City Light Image */}
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/lisboa_light.jpg"
                    alt="Portugal Office - City Lights"
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover city-light-image"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-medium text-[#1d1d1f] mb-6 tracking-tight">
                {t('contact.getInTouch')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#1d1d1f] mb-2">{t('contact.email')}</h3>
                  <p className="text-gray-600">info@lumalima.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#1d1d1f] mb-2">{t('contact.generalInfo')}</h3>
                  <p className="text-gray-600">{t('contact.generalInfo.desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-800">
                    {submitMessage}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
                    {submitMessage}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1d1d1f] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1d1d1f] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    {t('contact.form.projectType')}
                  </label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1d1d1f] focus:outline-none transition-colors"
                  >
                    <option value="">{t('contact.form.selectCategory')}</option>
                    <option value="housing">{t('category.housing')}</option>
                    <option value="comercial">{t('category.comercial')}</option>
                    <option value="public">{t('category.public')}</option>
                    <option value="urban">{t('category.urban')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea 
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1d1d1f] focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* reCAPTCHA v3 is invisible */}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1d1d1f] text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}