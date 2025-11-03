import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type GalleryImage = {
  id: string;
  title: string;
  caption: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  uploaded_by: string;
};

const PortfolioSection = () => {
  const { data: galleryItems } = useQuery<GalleryImage[]>({
    queryKey: ["featured-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as GalleryImage[];
    },
  });

  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portofolio Proyek</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lihat beberapa proyek yang telah kami kerjakan dengan standar kualitas terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryItems.map((item) => {
            const imageUrl = item.image_path.startsWith('http') 
              ? item.image_path 
              : `${supabase.storage.from('gallery-images').getPublicUrl(item.image_path).data.publicUrl}`;
            
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-elegant transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.caption}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/galeri">
            <Button variant="outline" size="lg">
              Lihat Semua Proyek <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
