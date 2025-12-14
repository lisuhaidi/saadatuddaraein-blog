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
  if (!STRAPI_URL) {
    console.warn('fetchStrapiData: PUBLIC_STRAPI_URL is not defined. Request may fail.');
  }
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

export async function getArticlesByCategorySlug(categorySlug: string) {
  const encodedSlug = encodeURIComponent(categorySlug);
  const customQuery = `filters[category][slug][$eq]=${encodedSlug}&populate[0]=author.avatar&populate[1]=category&populate[2]=blocks`;
  return fetchStrapiData('articles', customQuery);
}

// fungsi khusus untuk mengambil data blog categories
export async function getCategories() {
  const response = await fetchStrapiData('categories');  
  return response;
}

// fungsi khusus untuk mengambil data guru
export async function getTeachers() {
  const customQuery = 'populate=*&sort=createdAt:asc';
  const response = await fetchStrapiData('teachers', customQuery);  
  return response;
}

// Fungsi khusus untuk mengambil guru tunggal berdasarkan slug
export async function getTeacherBySlug(slug: string) {
  const encoded = encodeURIComponent(slug)
  const customQuery = `filters[slug][$eq]=${encoded}&${DEFAULT_POPULATE_QUERY}`;
  const data = await fetchStrapiData('teachers', customQuery);
  return data[0] || null; // Mengembalikan objek artikel pertama atau null
}

// fungsi khusus untuk mengambil data videos
export async function getVideos() {
  const response = await fetchStrapiData('videos');  
  return response;
}

// fungsi khusus untuk mengambil data testimonies
export async function getTestimonies() {
  // Be resilient to different collection naming in Strapi (testimonies vs testimonials)
  const candidates = ['testimonies', 'testimonials', 'testimony'];
  for (const endpoint of candidates) {
    try {
      const res = await fetchStrapiData(endpoint);
      console.log(`getTestimonies: fetched from /api/${endpoint}clear`);
      if (Array.isArray(res) && res.length > 0) return res;
      // if response has items mapped from Strapi (even if zero), continue trying other names
    } catch (err) {
      console.warn(`getTestimonies: gagal mengambil dari /api/${endpoint}:`, err instanceof Error ? err.message : err);
      // try next candidate
    }
  }

  // Jika semua gagal/kosong, kembalikan array kosong (caller akan menanganinya)
  console.warn('getTestimonies: tidak menemukan data pada semua endpoint kandidat, mengembalikan [].');
  return [];
}



// Fungsi khusus untuk mengambil video tunggal berdasarkan slug
export async function getVideoBySlug(slug: string) {
  const encoded = encodeURIComponent(slug)
  const customQuery = `filters[slug][$eq]=${encoded}&${DEFAULT_POPULATE_QUERY}`;
  const data = await fetchStrapiData('videos', customQuery);
  return data[0] || null; // Mengembalikan objek artikel pertama atau null
}


// *****************
//fungsi khusus untuk mengambil single collection about
export async function fetchSingleCollection( {endpoint, customQuery = 'populate=*'} : {endpoint: string, customQuery?: string} ) {
  const url = `${STRAPI_URL}/api/${endpoint}?${customQuery}`;
  
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
  
    if (json.data && json.data.attributes) {
    return {
      id: json.data.id,
      ...json.data.attributes
    };
  }
  // Fallback for unexpected structure
  return json.data;
}

/**
 * Fungsi untuk mengirim testimoni baru ke Strapi
 * Endpoint: /api/testimonies (POST)
 */
export async function postTestimony(data: { name: string; position: string; body: string; star: number }) {
  const endpoint = 'testimonies'; // Menggunakan 'testimonies' (plural) sesuai konvensi Strapi
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  const payload = {
    data: {
      name: data.name,
      position: data.position,
      body: data.body,
      star: data.star,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`, 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal mengirim testimoni ke ${endpoint}. Status: ${response.status}. Error: ${errorText}`);
  }

  return await response.json();
}
