# Lumalima - Illumination Atelier Website

## Project Overview
- **Company**: Lumalima (Illumination Atelier)
- **Framework**: Next.js 15.4.6 with TypeScript
- **Styling**: Tailwind CSS
- **Design Style**: Apple-inspired, clean, minimal
- **Repository**: https://github.com/kontyente/lumalima-webpage.git
- **Performance**: Vercel Speed Insights integrated

## Team
- **Founder**: Arq. Raquel Contente
- **Lead Lighting Designer**: Christian Nascimento
- **Offices**: Portugal and Switzerland

## Design Specifications

### Colors
- **Background**: #f5f5f7 (Apple-style light gray)
- **Text**: #1d1d1f (dark gray/black)
- **Category Images**: Sepia filter by default, full color on hover
- **Accent Colors**: Amber/Orange/Yellow tones for lighting effects

### Typography
- **Font Family**: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif
- **Headings**: Font-light, tracking-tight
- **Body Text**: Leading-relaxed

### Layout
- Clean Apple-style design
- No borders, minimal lines
- Rounded corners (rounded-3xl, rounded-2xl)
- Full-width category grid
- Responsive breakpoints: mobile, md (tablet), lg (desktop)

## Site Structure

### Main Pages
1. **Home** (/) - Four main categories with sepia/color hover effect
2. **About** (/about) - Team profiles with LinkedIn links and Calendly integration
3. **Services** (/services) - Four service types with detailed descriptions
4. **Contact** (/contact) - Contact form and information

### Main Categories (with sub-pages)
1. **Housing** (/housing) - Private residences
2. **Comercial** (/comercial) - Commercial spaces
3. **Public** (/public) - Public buildings
4. **Urban** (/urban) - Urban lighting

## Features Implemented
- **Multi-language Support**: Portuguese (PT), English (EN), German (DE)
- **Responsive Navigation**: Hamburger menu for mobile with slide-out drawer
- **Image Galleries**: Infinite scroll with preloading and fullscreen modal
- **Animations**: Scroll-triggered animations, fade-in effects
- **Image Optimization**: Lazy loading, preloading critical images
- **Contact Form**: Functional email integration
- **Performance Monitoring**: Vercel Speed Insights

## Services Offered
1. **Design de Iluminação**: International expertise with fair participation
2. **Consultoria**: Personalized pricing, multiple specialties
3. **Instalação**: Certified partners, construction supervision
4. **Manutenção**: Different packages based on lighting type

## Technical Details

### Dependencies
- Next.js 15.4.6
- React 19.1.0
- TypeScript
- Tailwind CSS 3.5.6
- Framer Motion 12.23.15 (installed but not actively used)
- @vercel/speed-insights 1.2.0

### Key Components
- **Navigation**: Responsive with mobile hamburger menu
- **CategoryCard**: Sepia filter with hover effects
- **InfiniteGallery**: Triple image array for seamless scrolling
- **LanguageSwitcher**: Three-language support
- **ImagePreloader**: Smooth image loading on main page
- **Footer**: Consistent across all pages

### Mobile Optimizations
- Hamburger menu with overlay
- Touch-friendly interactions
- Responsive image layouts
- Adjusted padding/margins for mobile
- Rounded corners only on bottom for mobile images in services

## Git Configuration
- **Author**: Raquel Contente <rc@lumalima.com>
- **Auto-deploy**: Connected to Vercel

## Development Commands
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run linter
```

## Important Notes
- Always refer to Raquel as "Arq. Raquel Contente" (formal treatment)
- No specific pricing should be displayed (use "personalized pricing")
- Maintain clean, minimal Apple-inspired aesthetic
- Images use sepia filter for artistic effect
- All text should be justified on mobile for better readability
- Services page has special rounded corners treatment for mobile