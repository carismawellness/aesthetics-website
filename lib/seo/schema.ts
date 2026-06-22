const BASE_URL = 'https://www.carismaaesthetics.com';

export const MEDICAL_REVIEWER = {
  '@type': 'Person',
  name: 'Dr. Giovanni Scornavacca',
  jobTitle: 'Medical Director',
  url: `${BASE_URL}`,
};

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    provider: {
      '@type': 'MedicalOrganization',
      name: 'Carisma Aesthetics',
      url: BASE_URL,
    },
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function medicalProcedure(opts: {
  name: string;
  description: string;
  url: string;
  faqs?: { question: string; answer: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    procedureType: 'https://schema.org/CosmeticProcedure',
    ...(opts.faqs
      ? {
          mainEntityOfPage: {
            '@type': 'FAQPage',
            mainEntity: opts.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        }
      : {}),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    author: { '@type': 'Organization', name: 'Carisma Aesthetics', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Carisma Aesthetics',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/logos/carisma-wordmark.svg` },
    },
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.publishedTime ? { datePublished: opts.publishedTime } : {}),
    ...(opts.modifiedTime ? { dateModified: opts.modifiedTime } : {}),
  };
}
