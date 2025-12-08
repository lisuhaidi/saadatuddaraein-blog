import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCardSkeleton from "../blog/BlogCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface Video {
  id: number;
  title: string;
  slug: string;
  body: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  urlVideo: string;
  urlThumbnai: string;
}

export default function LatestVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos.json");
        const reversedVideos = response.data.slice().reverse();
        setVideos(reversedVideos);
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data video.");
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
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
    <section className="w-full py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Video Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi video kegiatan dan momen penting di Saadatuddaraein
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          { videos.map((video) => (
                <a
                  key={video.id}
                  href={`/video/${video.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    {/* Thumbnail with Play Button */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={video.urlThumbnai}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                      {/* Play Button */}
                      <div className="group absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                          <Play className="w-7 h-7 text-primary group-hover:fill-primary ml-1" />
                        </div>
                      </div>
                      
                      {/* Platform Badge */}
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                        {video.platform}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="px-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-grow">
                        {video.body}
                      </p>
                      <p className="text-xs text-muted-foreground mt-auto">
                        {new Date(video.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <a
            href="/video"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            Lihat Semua Video
            <Play className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}