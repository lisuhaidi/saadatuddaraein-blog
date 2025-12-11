import fs from "fs";
import path from "path";

export async function POST({ request }) {
  const body = await request.json();

  const filePath = path.join(process.cwd(), "src/data/gallery.json");

  // Baca JSON lama
  const oldData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // 1. Cek apakah id sudah ada
  const duplicate = oldData.data.find((item) => item.id === body.id);

  if (duplicate) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "ID sudah digunakan, gunakan ID lain!",
      }),
      { status: 400 }
    );
  }

  // 2. Tambah data baru + timestamp
  oldData.data.push({
    id: body.id,
    title: body.title,
    description: body.description,
    url: body.url,
    created_at: new Date().toISOString() // tanggal otomatis
  });

  // Simpan kembali
  fs.writeFileSync(filePath, JSON.stringify(oldData, null, 2));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
