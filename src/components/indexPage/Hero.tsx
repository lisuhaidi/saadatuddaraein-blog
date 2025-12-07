import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  slogan?: string;
};

// Client-side hero slider. Fetches cached data from /api/hero.json
export default function HeroSlider({ title, slogan }: Props) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await axios.get("/api/hero.json");
        const payload = res?.data ?? null;

        // Flexible extraction to support different shapes returned by the API
        let items: any[] = [];
        if (Array.isArray(payload)) items = payload as any[];
        else if (Array.isArray(payload.data)) items = payload.data as any[];
        else if (Array.isArray((payload as any).images)) items = (payload as any).images;
        else if (payload?.data?.data) items = payload.data.data;

        const urls = items
          .map((it: any) => {
            if (!it) return null;
            if (typeof it === "string") return it;
            return (
              it.url || it.src || it.attributes?.url || it.attributes?.src || it?.image?.url || it?.image?.data?.attributes?.url || null
            );
          })
          .filter(Boolean) as string[];

        if (mounted) setImages(urls.length ? urls : ["/placeholder-hero.jpg"]);
      } catch (err) {
        console.error("[HeroSlider] failed to load /api/hero.json", err);
        if (mounted) setImages(["/placeholder-hero.jpg"]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images]);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden shadow-xl">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse w-48 h-48 rounded bg-gray-300" />
        </div>
      )}

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
