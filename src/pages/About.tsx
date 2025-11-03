import { Target, Eye, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16">
        {/* Header */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-xl max-w-3xl mx-auto">
              PT Aratindo Karya Utama adalah perusahaan konstruksi terkemuka di Indonesia
            </p>
          </div>
        </section>

        {/* Company Profile */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Profil Perusahaan</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  PT Aratindo Karya Utama adalah perusahaan yang bergerak di bidang konstruksi dan infrastruktur. 
                  Dengan pengalaman lebih dari satu dekade, kami telah mengerjakan berbagai proyek berskala besar 
                  di seluruh Indonesia.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Kami berkomitmen untuk memberikan layanan terbaik dengan standar kualitas internasional. 
                  Tim profesional kami yang berpengalaman siap membantu mewujudkan proyek impian Anda 
                  dengan hasil yang memuaskan.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kepercayaan klien adalah aset paling berharga bagi kami. Kami selalu mengutamakan kepuasan 
                  klien dengan memberikan solusi konstruksi yang inovatif, efisien, dan tepat waktu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision and Mission */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <Eye className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Visi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi perusahaan konstruksi terkemuka di Indonesia yang dikenal dengan kualitas, 
                    inovasi, dan komitmen terhadap kepuasan pelanggan serta pembangunan berkelanjutan.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Misi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Memberikan layanan konstruksi berkualitas tinggi</li>
                    <li>• Menerapkan standar keselamatan kerja terbaik</li>
                    <li>• Mengembangkan sumber daya manusia profesional</li>
                    <li>• Berkontribusi pada pembangunan infrastruktur nasional</li>
                    <li>• Menjalin kemitraan jangka panjang dengan klien</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nilai-Nilai Kami</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nilai-nilai yang menjadi fondasi setiap pekerjaan kami
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Kualitas</CardTitle>
                  <CardDescription>
                    Kami berkomitmen untuk memberikan hasil kerja dengan standar kualitas tertinggi
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Integritas</CardTitle>
                  <CardDescription>
                    Kejujuran dan transparansi dalam setiap aspek bisnis kami
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Inovasi</CardTitle>
                  <CardDescription>
                    Terus berinovasi untuk memberikan solusi terbaik bagi klien kami
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;