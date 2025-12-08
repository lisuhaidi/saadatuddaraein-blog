import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Star, UserCheck } from "lucide-react";

const advantages = [
  {
    title: "Integrasi Sains & Quran",
    description: "Menggabungkan pembelajaran sains modern dengan nilai-nilai Al-Qur'an.",
    icon: GraduationCap,
  },
  {
    title: "Mengutamakan Akhlak Mulia",
    description: "Membentuk karakter santri dengan akhlak yang mulia dan berintegritas.",
    icon: Star,
  },
  {
    title: "Pengajar Kompeten",
    description: "Dibimbing oleh pengajar berpengalaman dan profesional di bidangnya.",
    icon: UserCheck,
  },
];

export default function KeunggulanPondok() {
  return (
    <section className="w-full py-4 md:py-2 bg-secondary">
      <div className="container max-w-7xl mx-auto px-6 text-center md:text-left">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Kenapa Saadatuddaraein?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="group flex flex-col items-center md:items-start p-6 shadow-sm border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-0">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
                <CardContent className="p-0" >
                    <CardTitle className="text-xl font-semibold py-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
