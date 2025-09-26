// ========== src/components/common/SEOHead.jsx (Amélioré) ==========
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO } from '../../utils/constants';

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  keywords = [],
  author = PERSONAL_INFO.name,
  noIndex = false,
  canonicalUrl
}) => {
  const siteUrl = import.meta.env.VITE_APP_URL || 'https://soulemaneyeo.com';
  const defaultImage = `${siteUrl}/images/og-image.jpg`;
  
  const fullTitle = title ? `${title} | ${PERSONAL_INFO.name}` : `${PERSONAL_INFO.name} - Développeur Full-Stack`;
  const fullDescription = description || `Portfolio de ${PERSONAL_INFO.name} - Développeur Full-Stack Python/React spécialisé en Django, FastAPI et IA. Créateur d'OpportuCI.`;
  const fullImage = image || defaultImage;
  const fullUrl = url || siteUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": PERSONAL_INFO.name,
    "jobTitle": "Développeur Full-Stack",
    "description": fullDescription,
    "url": siteUrl,
    "email": PERSONAL_INFO.email,
    "telephone": PERSONAL_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abidjan",
      "addressCountry": "CI"
    },
    "sameAs": [
      PERSONAL_INFO.social.github,
      PERSONAL_INFO.social.linkedin
    ],
    "knowsAbout": ["Python", "Django", "FastAPI", "React", "JavaScript", "Machine Learning"],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Université Virtuelle de Côte d'Ivoire"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="author" content={author} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || fullUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={PERSONAL_INFO.name} />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={PERSONAL_INFO.name} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Prefetch DNS */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
    </Helmet>
  );
};

export default SEOHead;