import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
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
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: window.location.origin },
    { name: "Blog", url: window.location.href },
  ]);

  const websiteSchema = generateWebsiteSchema();

  return (
    <div className="min-h-screen flex flex-col">
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
        <section className="bg-gradient-hero text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Blog</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2">
              Berita, wawasan, dan pembaruan terkini dari PT Aratindo Karya Utama
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Memuat artikel...</p>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-elegant transition-shadow flex flex-col">
                    {post.featured_image && (
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader className="flex-1">
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      {post.published_at && (
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(post.published_at), "d MMMM yyyy", { locale: id })}
                        </p>
                      )}
                      <CardDescription className="line-clamp-3 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link 
                        to={`/blog/${post.slug}`}
                        onClick={() => trackEvent("click", "blog", `view_post_${post.slug}`)}
                      >
                        <Button variant="ghost" className="w-full">
                          Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;