import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { CONTACT_EMAIL } from '@/data/pricing';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const BASE_URL = 'https://www.lacunadigital.io';

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  jsonLd,
  noindex,
}: SEOProps) {
  const { pathname } = useLocation();
  const isServices = pathname === '/services' || pathname.startsWith('/services/');
  const fullTitle = isServices ? `${title} | Lacuna Digital` : title === 'Home' ? 'Dave Kelly — Senior Product Designer' : `${title} | Dave Kelly`;
  const siteName = isServices ? 'Lacuna Digital' : 'Dave Kelly';
  const shareImage = image ?? `${BASE_URL}/${isServices ? 'og-default.png' : 'og-portfolio.png'}`;

  const canonicalUrl = `${BASE_URL}${url ?? pathname}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : isServices ? [{
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/services#business`,
    name: 'Lacuna Digital',
    url: `${BASE_URL}/services`,
    logo: `${BASE_URL}/favicon.png`,
    email: CONTACT_EMAIL,
    address: { '@type': 'PostalAddress', addressRegion: 'North County Dublin', addressCountry: 'IE' },
    areaServed: { '@type': 'Country', name: 'Ireland' },
    founder: { '@id': `${BASE_URL}/#dave-kelly` },
  }] : [];

  return (
    <Helmet defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}
