import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/utils/structuredData";
import { Helmet } from "react-helmet-async";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useEffect } from "react";
import { trackEvent } from "@/components/Analytics";

const BlogDetail = () => {
  const { slug } = useParams();
  usePageTracking();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (post) {
      trackEvent("view", "blog_article", post.slug);
    }
  }, [post]);

  const articleSchema = post ? generateArticleSchema({
    title: post.title,
    description: post.excerpt || "",
    image: post.featured_image || "",
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: "PT Aratindo Karya Utama",
    url: window.location.href,
  }) : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: window.location.origin },
    { name: "Blog", url: `${window.location.origin}/blog` },
    { name: post?.title || "Article", url: window.location.href },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {post && (
        <>
          <SEO
            title={post.title}
            description={post.excerpt || ""}
            keywords={`${post.title}, konstruksi, PT Aratindo Karya Utama`}
            image={post.featured_image || ""}
            url={window.location.href}
            type="article"
            publishedTime={post.published_at || post.created_at}
            modifiedTime={post.updated_at}
            article={true}
          />
          <Helmet>
            {articleSchema && (
              <script type="application/ld+json">
                {JSON.stringify(articleSchema)}
              </script>
            )}
            <script type="application/ld+json">
              {JSON.stringify(breadcrumbSchema)}
            </script>
          </Helmet>
        </>
      )}
      <Navbar />
      
      <div className="flex-1 pt-16">
        {isLoading ? (
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        ) : post ? (
          <>
            {/* Header */}
            {post.featured_image && (
              <div 
                className="h-[400px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${post.featured_image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            )}

            {/* Content */}
            <article className="py-16 bg-background">
              <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/blog">
                  <Button variant="ghost" className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
                  </Button>
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                
                {post.published_at && (
                  <p className="text-muted-foreground mb-8">
                    {format(new Date(post.published_at), "d MMMM yyyy", { locale: id })}
                  </p>
                )}

                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </>
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-8">
              Maaf, artikel yang Anda cari tidak ditemukan.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;