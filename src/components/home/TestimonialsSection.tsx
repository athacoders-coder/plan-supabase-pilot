import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    position: "CEO, PT Maju Jaya",
    content: "PT Aratindo Karya Utama telah membantu kami menyelesaikan proyek gedung kantor dengan sempurna. Tim profesional dan hasil berkualitas tinggi.",
    initials: "BS",
  },
  {
    name: "Siti Rahayu",
    position: "Project Manager, PT Sejahtera Abadi",
    content: "Kerjasama yang sangat baik. Proyek selesai tepat waktu dengan kualitas melebihi ekspektasi. Highly recommended!",
    initials: "SR",
  },
  {
    name: "Andi Wijaya",
    position: "Direktur, PT Karya Mandiri",
    content: "Pelayanan konsultasi yang sangat profesional. Mereka memahami kebutuhan kami dan memberikan solusi terbaik untuk proyek infrastruktur kami.",
    initials: "AW",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimoni Klien</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Apa kata klien kami tentang layanan yang kami berikan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <Quote className="h-8 w-8 text-primary mb-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
