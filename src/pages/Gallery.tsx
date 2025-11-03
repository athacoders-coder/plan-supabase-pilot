import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Gallery = () => {
  const { data: photos, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16">
        {/* Header */}
        <section className="bg-gradient-hero text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Galeri</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2">
              Portofolio proyek dan kegiatan PT Aratindo Karya Utama
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Memuat galeri...</p>
              </div>
            ) : photos && photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-elegant transition-all"
                  >
                    <img 
                      src={photo.image_path} 
                      alt={photo.title || "Gallery photo"}
                      className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform group-hover:scale-110"
                    />
                    {(photo.title || photo.caption) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        {photo.title && (
                          <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                        )}
                        {photo.caption && (
                          <p className="text-white/90 text-sm">{photo.caption}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Belum ada foto dalam galeri.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;