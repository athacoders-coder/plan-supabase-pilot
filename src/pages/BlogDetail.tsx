import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const BlogDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
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

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Disalin",
        description: "Link artikel telah disalin ke clipboard",
      });
    }
  };

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
    <div className="min-h-screen flex flex-col bg-muted/30">
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
            {/* Hero Header */}
            {post.featured_image && (
              <div className="relative h-[500px] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.featured_image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
                </div>
                <div className="absolute inset-0 flex items-end">
                  <div className="container mx-auto px-4 pb-12">
                    <div className="max-w-4xl">
                      <Badge className="mb-4 bg-primary/90 text-primary-foreground">
                        Artikel
                      </Badge>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                        {post.title}
                      </h1>
                      {post.published_at && (
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="text-lg">
                              {format(new Date(post.published_at), "d MMMM yyyy", { locale: id })}
                            </span>
                          </div>
                          <Separator orientation="vertical" className="h-6 bg-white/30" />
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span className="text-lg">
                              {calculateReadingTime(post.content)} menit baca
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <article className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <Link to="/blog">
                      <Button variant="ghost" size="lg" className="group">
                        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" /> 
                        Kembali ke Blog
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={handleShare}
                      className="group"
                    >
                      <Share2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Bagikan
                    </Button>
                  </div>

                  {!post.featured_image && (
                    <>
                      <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
                      {post.published_at && (
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>
                              {format(new Date(post.published_at), "d MMMM yyyy", { locale: id })}
                            </span>
                          </div>
                          <Separator orientation="vertical" className="h-6" />
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span>
                              {calculateReadingTime(post.content)} menit baca
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="bg-card rounded-xl shadow-lg p-8 sm:p-12">
                    <div 
                      className="prose prose-lg prose-slate max-w-none
                        prose-headings:font-bold prose-headings:text-foreground
                        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
                        prose-img:rounded-lg prose-img:shadow-md
                        dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>

                  {/* Author & Share Section */}
                  <div className="mt-12 p-8 bg-muted rounded-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ditulis oleh</p>
                        <p className="text-xl font-bold">PT Aratindo Karya Utama</p>
                      </div>
                      <Button size="lg" onClick={handleShare} className="group">
                        <Share2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Bagikan Artikel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </>
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Maaf, artikel yang Anda cari tidak ditemukan.
            </p>
            <Link to="/blog">
              <Button size="lg">
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
