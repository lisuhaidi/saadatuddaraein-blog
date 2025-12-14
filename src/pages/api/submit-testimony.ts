import type { APIRoute } from "astro";
import { postTestimony } from "@/lib/strapi";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validasi input sederhana
    if (!body.name || !body.position || !body.content || !body.rating) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Mapping data dari form ke format yang dibutuhkan Strapi
    const strapiData = {
      name: body.name,
      position: body.position,
      body: body.content.substring(0, 400), // Memastikan maksimal 400 karakter
      star: parseInt(body.rating, 10),      // Konversi string rating ke integer
    };

    const result = await postTestimony(strapiData);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error submitting testimony:", error);
    return new Response(JSON.stringify({ 
      message: error instanceof Error ? error.message : "Gagal mengirim testimoni" 
    }), { status: 500 });
  }
};