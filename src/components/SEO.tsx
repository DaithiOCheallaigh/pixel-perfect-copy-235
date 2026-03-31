import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const DEFAULT_IMAGE = 'https://www.lacunadigital.io/og-default.png';
const BASE_URL = 'https://www.lacunadigital.io';

export function SEO({ title, description, image = DEFAULT_IMAGE, url = '/' }: SEOProps) {
  const fullTitle = title === 'Home'
    ? 'Lacuna Digital — Dave Kelly | Digital Designer & UX Strategist'
    : `${title} | Lacuna Digital`;

  const canonicalUrl = `${BASE_URL}${url}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lacuna Digital" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
