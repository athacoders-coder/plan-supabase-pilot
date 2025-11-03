import { TrendingUp, Users, Award, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Building2,
    value: "150+",
    label: "Proyek Selesai",
  },
  {
    icon: Users,
    value: "500+",
    label: "Klien Puas",
  },
  {
    icon: Award,
    value: "25+",
    label: "Penghargaan",
  },
  {
    icon: TrendingUp,
    value: "15+",
    label: "Tahun Pengalaman",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary-foreground" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-primary-foreground/80">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
