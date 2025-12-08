import { getVideos } from "@/lib/strapi";

let cache: any = null;
let lastFetch = 0;
const CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export async function GET() {
  const now = Date.now();

  if (!cache || now - lastFetch > CACHE_TIME) {
    try {
      const data = await getVideos();
      cache = data;
      lastFetch = now;
    } catch (err) {
      console.error("Gagal fetch teachers:", err);
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
