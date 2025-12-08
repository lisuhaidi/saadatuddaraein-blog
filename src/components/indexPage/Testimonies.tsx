import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Ratione, ullam? Lusto id ut omnis repellat.",
  },
  {
    name: "John Smith",
    role: "COO",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "Dolor sit amet odio, incidunt.",
  },
  {
    name: "Gordon Doe",
    role: "Developer",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    quote: "Excepteur sint occaecat cupidatat non proident.",
  },
  {
    name: "Sarah Johnson",
    role: "Designer",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Mike Wilson",
    role: "Product Manager",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
];

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TestimonialRow({ testimonials, reverse = false }: { testimonials: typeof testimonials; reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let scrollAmount = reverse ? container.scrollWidth / 2 : 0;
    const scrollStep = reverse ? -1 : 1;
    const speed = 16;
    
    const scrollInterval = setInterval(() => {
      if (!container) return;
      
      scrollAmount += scrollStep;
      
      if (!reverse && scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      } else if (reverse && scrollAmount <= 0) {
        scrollAmount = container.scrollWidth / 2;
      }
      
      container.scrollLeft = scrollAmount;
    }, speed);
    
    return () => clearInterval(scrollInterval);
  }, [reverse]);
  
  const loopedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div
      ref={containerRef}
      className="flex gap-6 overflow-hidden select-none"
    >
      {loopedTestimonials.map((t, idx) => (
        <Card key={`${t.name}-${idx}`} className="flex-shrink-0 w-80 shadow-sm border bg-card p-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={t.photo}
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-base">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">"{t.quote}"</p>
        </Card>
      ))}
    </div>
  );
}

export default function TestimoniSlider() {
  const [shuffledRow1, setShuffledRow1] = useState(testimonials);
  const [shuffledRow2, setShuffledRow2] = useState(testimonials);
  
  useEffect(() => {
    setShuffledRow1(shuffleArray(testimonials));
    setShuffledRow2(shuffleArray(testimonials));
  }, []);
  
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Cerita Mereka</h2>
        <p className="text-muted-foreground text-center mb-8">Ikuti pengalaman mereka di Saadatuddarein.</p>
        
        <div className="space-y-6">
          {/* First row - slides left to right */}
          <TestimonialRow testimonials={shuffledRow1} />
          
          {/* Second row - slides right to left (desktop only) */}
          <div className="hidden md:block">
            <TestimonialRow testimonials={shuffledRow2} reverse />
          </div>

          {/* Button below carousel */}
            <div className="flex justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Tambahkan Ceritamu dengan Saadatuddaraein
            </button>
            </div>
        </div>
      </div>
    </section>
  );
}