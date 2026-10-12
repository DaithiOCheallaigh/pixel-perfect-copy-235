import { Helmet } from 'react-helmet-async';

interface SEOProps {
  brand?: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_IMAGE = 'https://www.lacunadigital.io/og-default.png';
const BASE_URL = 'https://www.lacunadigital.io';

export function SEO({
  brand = 'Lacuna Digital',
  title,
  description,
  image = DEFAULT_IMAGE,
  url = '/',
  type = 'website',
  jsonLd,
}: SEOProps) {
  const homeTitle = brand === 'Lacuna Digital' ? 'Lacuna Digital — AI-Powered Product Design by Dave Kelly' : brand;
  const fullTitle = title === 'Home' ? homeTitle : `${title} | ${brand}`;

  const canonicalUrl = `${BASE_URL}${url}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={brand} />
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
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}
