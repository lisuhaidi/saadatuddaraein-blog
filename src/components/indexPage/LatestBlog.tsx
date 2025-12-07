import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogCardSkeleton } from "../BlogCardSekeleton";


interface Article {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorAvatar?: string;
  categoryName?: string;
  cover?: string;
  published: string;
  slug: string;
}

// Format tanggal ke format Indonesia
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export default function LatestBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/listBlog.json');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        const reversedData = data.slice().reverse();
        
        // Normalisasi data - ambil 4 artikel terbaru
        const preparedArticles = (reversedData || [])
          .slice(0, 4)
          .map((article: any) => {
            const authorName = article?.author?.name || 'Anonymous';
            const authorAvatar = article?.author?.avatar?.formats?.small?.url || article?.author?.avatar?.data?.attributes?.url || null;
            const categoryName = article?.category?.name || null;
            const published = article?.publishedAt || article?.createdAt || new Date().toISOString();
            const slug = article?.slug || `article-${article.id}`;
            const coverLink = article?.coverlink || null;

            return {
              id: article.id,
              title: article.title || 'Untitled',
              description: article.description || '',
              authorName,
              authorAvatar: authorAvatar ? `${authorAvatar}` : undefined,
              categoryName,
              cover: coverLink,
              published,
              slug
            };
          });

        setArticles(preparedArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <BlogCardSkeleton key={n} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-destructive">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">
            Blog Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Artikel, tips, dan informasi seputar pendidikan Islam dan kegiatan di Saadatuddaraein
          </p>
        </div>

        {/* Blog Grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <Card className="h-full overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      {post.categoryName && (
                        <div className="absolute top-3 left-3">                      
                          <span className="inline-flex items-center rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur-sm">
                            {post.categoryName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(post.published)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors text-card-foreground">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                        {post.description}
                      </p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorAvatar || '/default-avatar.png'}
                            alt={post.authorName}
                            className="w-7 h-7 rounded-full object-cover"
                            loading="lazy"
                          />
                          <span className="text-xs text-muted-foreground">
                            {post.authorName}
                          </span>
                        </div>
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
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-muted-foreground">Belum ada artikel tersedia</p>
          </div>
        )}
      </div>
    </section>
  );
}