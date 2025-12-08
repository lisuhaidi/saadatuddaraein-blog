import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import hero from "@/data/hero.json"; 

// Data gambar hero ada di src/data/hero.json
//ganti gambar dengan link gambar di imgur


type Props = {
  title?: string;
  slogan?: string;
};

// Client-side hero slider.
export default function HeroSlider({ title, slogan }: Props) {
  const [index, setIndex] = useState(0);
  const images = hero.map((image) => image.src);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden shadow-xl">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`hero-${i}`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${i === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">{title}</h1>
          <p className="text-white/90 text-lg md:text-2xl mt-2 drop-shadow-md">{slogan}</p>
          <a href="/about">
            <Button size="lg" className="mt-4">Pelajari Lebih Lanjut</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
