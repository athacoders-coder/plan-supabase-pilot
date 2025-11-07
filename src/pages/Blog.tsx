import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { generateBreadcrumbSchema, generateWebsiteSchema } from "@/utils/structuredData";
import { Helmet } from "react-helmet-async";
import { usePageTracking } from "@/hooks/usePageTracking";
import { trackEvent } from "@/components/Analytics";

const Blog = () => {
  usePageTracking();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // Try with relations first, fallback to simple query if tables don't exist
      let { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          post_tags (
            tags (
              id,
              name,
              slug
            )
          )
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });
      
      // If error (likely missing tables), fallback to simple query
      if (error) {
        const fallback = await supabase
          .from("posts")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false });
        
        if (fallback.error) throw fallback.error;
        return fallback.data;
      }
      
      return data;
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: window.location.origin },
    { name: "Blog", url: window.location.href },
  ]);

  const websiteSchema = generateWebsiteSchema();

  const featuredPost = posts?.[0];
  const regularPosts = posts?.slice(1);

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SEO
        title="Blog - PT Aratindo Karya Utama"
        description="Berita, wawasan, dan pembaruan terkini dari PT Aratindo Karya Utama tentang industri konstruksi, teknologi, dan inovasi"
        keywords="blog konstruksi, berita konstruksi, artikel konstruksi, teknologi konstruksi, PT Aratindo Karya Utama blog"
        url={window.location.href}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      <Navbar />
      
      <div className="flex-1 pt-16">
        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="container mx-auto px-4 py-20 sm:py-24 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                Wawasan & Artikel
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Blog & Insight
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Temukan wawasan mendalam, berita terkini, dan inovasi terbaru dalam industri konstruksi dan infrastruktur
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="py-12 sm:py-16 bg-background">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-8">Artikel Pilihan</h2>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none">
                    <div className="grid md:grid-cols-2 gap-0">
                      {featuredPost.featured_image && (
                        <div className="relative h-64 md:h-full overflow-hidden group">
                          <LazyImage 
                            src={featuredPost.featured_image} 
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-8 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                          Featured
                        </Badge>
                        <h3 className="text-3xl font-bold mb-4 line-clamp-2">
                          {featuredPost.title}
                        </h3>
                        {featuredPost.published_at && (
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(featuredPost.published_at), "d MMMM yyyy", { locale: id })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {calculateReadingTime(featuredPost.content)} menit baca
                            </div>
                          </div>
                        )}
                        {(featuredPost as any).categories && (
                          <Badge variant="outline" className="mb-2">
                            {(featuredPost as any).categories.name}
                          </Badge>
                        )}
                        <p className="text-muted-foreground mb-6 line-clamp-3 text-lg">
                          {featuredPost.excerpt}
                        </p>
                        <Link 
                          to={`/blog/${featuredPost.slug}`}
                          onClick={() => trackEvent("click", "blog", `view_post_${featuredPost.slug}`)}
                        >
                          <Button size="lg" className="group">
                            Baca Selengkapnya 
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            {/* Regular Posts Grid */}
            {regularPosts && regularPosts.length > 0 && (
              <section className="py-12 sm:py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-8">Artikel Terbaru</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <Card 
                        key={post.id} 
                        className="group hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border-none bg-card"
                      >
                        {post.featured_image && (
                          <div className="relative h-56 overflow-hidden">
                            <LazyImage 
                              src={post.featured_image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              placeholderClassName="rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </div>
                        )}
                        <CardHeader className="flex-1 space-y-3">
                          {post.published_at && (
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(post.published_at), "d MMM yyyy", { locale: id })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {calculateReadingTime(post.content)} min
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {(post as any).categories && (
                              <Badge variant="outline" className="text-xs">
                                {(post as any).categories.name}
                              </Badge>
                            )}
                            {(post as any).post_tags?.slice(0, 2).map((pt: any) => (
                              <Badge key={pt.tags.id} variant="secondary" className="text-xs">
                                {pt.tags.name}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Link 
                            to={`/blog/${post.slug}`}
                            onClick={() => trackEvent("click", "blog", `view_post_${post.slug}`)}
                          >
                            <Button variant="ghost" className="w-full group/btn">
                              Baca Artikel 
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
