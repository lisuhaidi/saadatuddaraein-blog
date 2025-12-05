import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const images = [
  "https://www.aswajadewata.com/wp-content/uploads/2023/03/Santri-baru-khas-kempek.jpg",
  "https://awsimages.detik.net.id/community/media/visual/2021/09/16/ilustrasi-santri_169.jpeg?w=650",
  "https://cdn.kemenag.go.id/storage/posts/16_9/big/1729585971.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQ3AVdLnAlgTsaM003MujgsjY_wCt0bwrZw&s"
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden shadow-xl">

      {/* Images */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`
              absolute inset-0 w-full h-full object-cover transition-all duration-1000
              ${i === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
            `}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            Saadatuddaraein
          </h1>
          <p className="text-white/90 text-lg md:text-2xl mt-2 drop-shadow-md">
            Pusat Edukasi Islam Unggulan
          </p>
          <Button size="lg" className="mt-4">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
}
