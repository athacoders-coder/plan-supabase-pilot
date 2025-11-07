import { Link } from "react-router-dom";
import { ArrowRight, Building, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import LazyImage from "@/components/LazyImage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-bg.jpg";
const Home = () => {
  const {
    data: recentPosts
  } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("posts").select("*").eq("status", "published").order("published_at", {
        ascending: false
      }).limit(3);
      if (error) throw error;
      return data;
    }
  });
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Membangun Masa Depan Bersama
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            PT Aratindo Karya Utama - Partner terpercaya untuk solusi konstruksi dan infrastruktur
          </p>
          <Link to="/tentang-kami">
            <Button size="lg" className="shadow-elegant">
              Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan konstruksi profesional untuk kebutuhan proyek Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Konstruksi Bangunan</CardTitle>
                <CardDescription>
                  Pembangunan gedung komersial dan residensial dengan standar kualitas tertinggi
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Konsultasi Proyek</CardTitle>
                <CardDescription>
                  Layanan konsultasi profesional untuk perencanaan dan manajemen proyek konstruksi
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Infrastruktur</CardTitle>
                <CardDescription>
                  Pembangunan infrastruktur jalan, jembatan, dan fasilitas umum lainnya
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Testimonials Section */}
      

      {/* Recent Blog Posts */}
      {recentPosts && recentPosts.length > 0 && <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Artikel Terbaru</h2>
              <p className="text-lg text-muted-foreground">
                Berita dan wawasan terkini dari dunia konstruksi
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {recentPosts.map(post => <Card key={post.id} className="hover:shadow-elegant transition-shadow">
                  {post.featured_image && <LazyImage src={post.featured_image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" placeholderClassName="rounded-t-lg" />}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="w-full">
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>)}
            </div>

            <div className="text-center">
              <Link to="/blog">
                <Button variant="outline">
                  Lihat Semua Artikel
                </Button>
              </Link>
            </div>
          </div>
        </section>}

      {/* Contact Form Section */}
      <ContactForm />

      <Footer />
      <WhatsAppButton />
    </div>;
};
export default Home;