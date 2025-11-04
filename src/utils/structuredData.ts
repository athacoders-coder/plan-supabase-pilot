export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Aratindo Karya Utama",
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    description: "Perusahaan konstruksi profesional dengan pengalaman lebih dari satu dekade",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Jakarta",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-XXX-XXXX-XXXX",
      contactType: "Customer Service",
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
    sameAs: [
      "https://www.facebook.com/aratindo",
      "https://www.linkedin.com/company/aratindo",
      "https://www.instagram.com/aratindo",
    ],
  };
};

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PT Aratindo Karya Utama",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PT Aratindo Karya Utama",
    url: window.location.origin,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${window.location.origin}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};
