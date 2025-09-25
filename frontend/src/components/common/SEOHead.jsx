// ========== frontend/src/components/common/SEOHead.jsx ==========
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateMetaTags } from '../../utils/helpers';

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  keywords = [],
  author = 'Souleymane Yeo'
}) => {
  const metaTags = generateMetaTags(title, description, image, url);

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="author" content={author} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTags['og:title']} />
      <meta property="og:description" content={metaTags['og:description']} />
      <meta property="og:image" content={metaTags['og:image']} />
      <meta property="og:url" content={metaTags['og:url']} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={metaTags['og:site_name']} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={metaTags['twitter:card']} />
      <meta name="twitter:title" content={metaTags['twitter:title']} />
      <meta name="twitter:description" content={metaTags['twitter:description']} />
      <meta name="twitter:image" content={metaTags['twitter:image']} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url || metaTags['og:url']} />
    </Helmet>
  );
};

export default SEOHead;