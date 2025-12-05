import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

const videosData = [
  {
    id: 1,
    title: "Kegiatan Belajar Mengajar di Madrasah Tsanawiyah",
    description: "Melihat suasana pembelajaran yang kondusif dan interaktif di kelas",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop",
    duration: "5:32",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    date: "2 hari yang lalu",
  },
  {
    id: 2,
    title: "Wisuda Hafiz Al-Qur'an 30 Juz",
    description: "Momen kebanggaan wisuda santri yang telah menyelesaikan hafalan 30 juz",
    thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=450&fit=crop",
    duration: "8:15",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    date: "1 minggu yang lalu",
  },
  {
    id: 3,
    title: "Ekstrakurikuler Pramuka",
    description: "Kegiatan outdoor dan pembentukan karakter melalui Pramuka",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop",
    duration: "6:48",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    date: "2 minggu yang lalu",
  },
  {
    id: 4,
    title: "Kegiatan Ramadan di Pesantren",
    description: "Suasana ibadah dan pembelajaran di bulan suci Ramadan",
    thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=450&fit=crop",
    duration: "7:22",
    videoUrl: "https://www.youtube.com/watch?v=example4",
    date: "3 minggu yang lalu",
  },
];

export default function LatestVideos() {
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
          {videosData.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Card className="h-full overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                {/* Thumbnail with Play Button */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                      <Play className="w-7 h-7 text-red-600 fill-red-600 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-grow">
                    {video.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-auto">
                    {video.date}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <a
            href="/videos"
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