import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogData = [
  {
    id: 1,
    title: "Tips Menghafal Al-Qur'an dengan Mudah dan Efektif",
    excerpt: "Menghafal Al-Qur'an adalah ibadah yang mulia. Berikut beberapa tips dan metode yang bisa membantu mempermudah proses menghafal...",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=500&fit=crop",
    category: "Pendidikan",
    readTime: "5 menit",
    date: "15 November 2024",
    author: "Ustadz Ahmad",
    slug: "/blog/tips-menghafal-quran",
  },
  {
    id: 2,
    title: "Peran Orang Tua dalam Pendidikan Anak di Pesantren",
    excerpt: "Kolaborasi antara pesantren dan orang tua sangat penting untuk kesuksesan pendidikan anak. Simak penjelasan lengkapnya...",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop",
    category: "Parenting",
    readTime: "7 menit",
    date: "10 November 2024",
    author: "Ustadzah Fatimah",
    slug: "/blog/peran-orang-tua",
  },
  {
    id: 3,
    title: "Kegiatan Ekstrakurikuler Membentuk Karakter Santri",
    excerpt: "Ekstrakurikuler bukan hanya untuk mengisi waktu luang, tapi juga membentuk karakter dan soft skill santri...",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=500&fit=crop",
    category: "Kegiatan",
    readTime: "6 menit",
    date: "5 November 2024",
    author: "Ustadz Rahman",
    slug: "/blog/ekstrakurikuler",
  },
  {
    id: 4,
    title: "Menyiapkan Generasi Berakhlak Mulia di Era Digital",
    excerpt: "Tantangan mendidik anak di era digital memerlukan pendekatan khusus. Bagaimana pesantren menghadapinya?...",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    category: "Opini",
    readTime: "8 menit",
    date: "1 November 2024",
    author: "Ustadz Yusuf",
    slug: "/blog/generasi-digital",
  },
];

const categoryColors: { [key: string]: string } = {
  "Pendidikan": "bg-blue-100 text-blue-700",
  "Parenting": "bg-green-100 text-green-700",
  "Kegiatan": "bg-purple-100 text-purple-700",
  "Opini": "bg-orange-100 text-orange-700",
};

export default function LatestBlog() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Blog Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Artikel, tips, dan informasi seputar pendidikan Islam dan kegiatan di Saadatuddaraein
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogData.map((post) => (
            <a
              key={post.id}
              href={post.slug}
              className="group block"
            >
              <Card className="h-full overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-muted-foreground">
                      {post.author}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      <span>Baca</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <a
            href="/blog"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}