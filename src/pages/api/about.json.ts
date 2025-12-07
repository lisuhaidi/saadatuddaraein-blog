// membuat cache untuk about dengan waktu cache 12 jam

import { getAbout } from "@/lib/strapi";

let cache: any = null;
let lastFetch = 0;
const CACHE_TIME = 1000 * 60 * 720; 

export async function GET() {
  const now = Date.now();

  if (!cache || now - lastFetch > CACHE_TIME) {
    try {
      const data = await getAbout();
      cache = data;
      lastFetch = now;
    } catch (err) {
      console.error("Gagal fetch hero image:", err);
      // fallback: tetap pakai cache lama kalau ada
      if (!cache) {
        return new Response(JSON.stringify({ error: "Gagal memuat data" }), {
          status: 500,
        });
      }
    }
  }

  return new Response(JSON.stringify(cache), {
    headers: { "Content-Type": "application/json" },
  });
}
