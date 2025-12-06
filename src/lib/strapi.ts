// src/lib/strapi.ts
// Mengambil variabel dari .env
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = import.meta.env.PUBLIC_STRAPI_API_TOKEN;

// Default configuration: populate semua relasi (gunakan populate=* untuk kemudahan)
const DEFAULT_POPULATE_QUERY = 'populate=*';

/**
 * Fungsi umum untuk mengambil data dari Strapi
 * @param endpoint - Endpoint API (e.g., 'articles')
 * @param query - Parameter kustom untuk filtering/pagination
 * @returns Data yang diformat
 */
export async function fetchStrapiData(endpoint: string, query: string = DEFAULT_POPULATE_QUERY) {
  const url = `${STRAPI_URL}/api/${endpoint}?${query}`;
  console.log(`Fetching from: ${url}`);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`, 
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // Log error status untuk debugging
    const errorText = await response.text();
    throw new Error(`Gagal mengambil data dari ${endpoint}. Status: ${response.status}. Error: ${errorText}`); // ✅ FIXED
  }

  const json = await response.json();
  // Memproses data untuk menghilangkan lapisan 'data' dan 'attributes' Strapi.
  // Be defensive: beberapa respons (mis. karena permission) mungkin tidak menyertakan `attributes`.
  return (json.data || []).map((item: any) => {
    if (item == null) return item
    if (item.attributes && Object.keys(item.attributes).length > 0) {
      return {
        id: item.id,
        ...item.attributes,
      }
    }

    // Jika attributes tidak ada, kembalikan seluruh item (agar caller dapat melihat struktur lengkap)
    return item
  })
}

// Fungsi khusus untuk mengambil semua artikel (yang sudah ter-populate)
export async function getArticles() {
    const customQuery = 'populate[0]=author.avatar&populate[1]=category&populate[2]=blocks';
    return fetchStrapiData('articles', customQuery);
}

// Fungsi khusus untuk mengambil artikel tunggal berdasarkan slug
export async function getArticleBySlug(slug: string) {
  const encoded = encodeURIComponent(slug)
  const customQuery = `filters[slug][$eq]=${encoded}&${DEFAULT_POPULATE_QUERY}`;
  const data = await fetchStrapiData('articles', customQuery);
  return data[0] || null; // Mengembalikan objek artikel pertama atau null
}