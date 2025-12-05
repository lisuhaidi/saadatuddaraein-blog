import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const galleryData = [
  {
    id: 1,
    title: "Kegiatan Pembelajaran",
    description: "Suasana belajar yang kondusif dan menyenangkan di kelas",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    link: "/gallery/pembelajaran",
  },
  {
    id: 2,
    title: "Kegiatan Ekstrakurikuler",
    description: "Berbagai aktivitas positif untuk mengembangkan bakat siswa",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop",
    link: "/gallery/ekstrakurikuler",
  },
  {
    id: 3,
    title: "Acara Tahunan",
    description: "Momen spesial dalam perayaan hari besar di sekolah",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    link: "/gallery/acara",
  },
  {
    id: 4,
    title: "Fasilitas Sekolah",
    description: "Sarana dan prasarana modern untuk mendukung pembelajaran",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    link: "/gallery/fasilitas",
  },
  {
    id: 5,
    title: "Prestasi Siswa",
    description: "Dokumentasi pencapaian dan penghargaan siswa",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    link: "/gallery/prestasi",
  },
];

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % galleryData.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  // Calculate visible slides
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % galleryData.length;
      slides.push(galleryData[index]);
    }
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <section className="w-full py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Galeri Kegiatan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi berbagai kegiatan dan momen berharga di Saadatuddaraein
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop View - 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {visibleSlides.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.link}
                className="block group"
              >
                <Card className="relative h-96 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  {/* Image with overlay */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>

          {/* Mobile View - 1 card */}
          <div className="md:hidden mb-8">
            <a
              href={galleryData[currentIndex].link}
              className="block group"
            >
              <Card className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={galleryData[currentIndex].image}
                  alt={galleryData[currentIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{galleryData[currentIndex].title}</h3>
                  <p className="text-sm text-white/90 mb-4">{galleryData[currentIndex].description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </a>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {galleryData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}