import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  article?: boolean;
}

const SEO = ({
  title = "PT Aratindo Karya Utama - Konstruksi Profesional",
  description = "PT Aratindo Karya Utama adalah perusahaan konstruksi terkemuka di Indonesia yang menyediakan layanan pembangunan berkualitas tinggi dengan pengalaman lebih dari satu dekade",
  keywords = "konstruksi, pembangunan, kontraktor, PT Aratindo Karya Utama, konstruksi Indonesia, jasa konstruksi",
  image = "https://mzzyqentnmitkgnffgsp.supabase.co/storage/v1/object/public/gallery-images/placeholder.jpg",
  url = window.location.href,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "PT Aratindo Karya Utama",
  article = false,
}: SEOProps) => {
  const siteName = "PT Aratindo Karya Utama";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="og:type" content="article" />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Indonesian" />
    </Helmet>
  );
};

export default SEO;
