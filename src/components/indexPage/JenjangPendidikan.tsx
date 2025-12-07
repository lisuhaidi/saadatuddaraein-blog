// components/EducationSection.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

const educationData = [
  {
    title: "Madrasah Tsanawiyah",
    description: "Pendidikan setingkat SMP dengan kurikulum agama dan umum yang seimbang.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/AVL1eMw9Gqi4jnG5/rkb.jpeg1714962854-mk3qQbZZvDcrr6Wk.jpeg",
  },
  {
    title: "Madrasah Aliyah",
    description: "Pendidikan setingkat SMA yang menekankan kemampuan akademik dan keislaman.",
    img: "https://manbuleleng.sch.id/assets/images/about/school-potrait.png",
  },
  {
    title: "Rumah Tahfiz",
    description: "Program penghafalan Al-Qur'an dengan metode intensif dan pembinaan akhlak.",
    img: "https://manbuleleng.sch.id/assets/images/about/school-potrait.png",
  },
  {
    title: "TPQ",
    description: "Pendidikan dasar Al-Qur'an untuk anak usia dini hingga remaja.",
    img: "https://manbuleleng.sch.id/assets/images/about/school-potrait.png",
  },
];

export default function EducationSection() {
  return (
    <section className="w-full py-4 md:pb-0 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl mb-4 md:text-4xl font-bold tracking-tight mb-2">
            Jenjang Pendidikan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Program pendidikan yang dirancang untuk membentuk generasi berilmu, berakhlak, dan siap menghadapi masa depan.
          </p>
        </div>

        {/* DESKTOP GRID AREA */}
        <section className="w-full hidden md:grid py-6 bg-background">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {educationData.map((edu) => (
                <Card key={edu.title} className="relative h-80 shadow-sm hover:shadow-lg transition-all duration-300 border bg-card overflow-hidden group">
                  {/* IMAGE MENUTUP SELURUH CARD */}
                  <img
                    src={edu.img}
                    alt={edu.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* CONTENT OVERLAY */}
                  <CardContent className="absolute bottom-0 left-0 w-full p-4 bg-card" style={{ height: 'calc(100% / 2.5)' }}>
                    <CardTitle className="text-xl font-semibold py-2 group-hover:text-primary transition-colors">{edu.title}</CardTitle>
                    <CardDescription>{edu.description}</CardDescription>
                  </CardContent>
                </Card>

              ))}
            </div>
          </div>
        </section>

        {/* MOBILE SCROLL AREA */}
        <ScrollArea className="md:hidden w-full overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {educationData.map((edu) => (
         <Card
            key={edu.title}
            className="relative flex-shrink-0 w-[70vw] max-w-xs shadow-lg border bg-card overflow-hidden h-[70vw]"
          >
            {/* IMAGE MENUTUP BAGIAN ATAS CARD */}
            <img
              src={edu.img}
              alt={edu.title}
              className="absolute top-0 left-0 w-full h-[60%] object-cover"
            />

            {/* CONTENT MENUTUP BAGIAN BAWAH CARD */}
            <CardContent className="absolute bottom-0 left-0 w-full h-[40%] p-4 bg-card flex flex-col justify-start gap-2">
              {/* TITLE DI ATAS */}
              <CardTitle className="text-xl md:text-2xl font-semibold">{edu.title}</CardTitle>
              
              {/* DESKRIPSI DI BAWAH TITLE */}
              <CardDescription className="text-sm md:text-base line-clamp-3">
                {edu.description}
              </CardDescription>
            </CardContent>
          </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>

    </section>
  );
}
