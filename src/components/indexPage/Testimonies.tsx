import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


// Define the shape of a single testimony
interface Testimony {
  id: number;
  name: string;
  position: string;
  body: string;
  createdAt: string;
  star: number;
  isConfirmed: boolean;
}

// Helper to generate star icons
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};


function TestimonialRow({ testimonials, reverse = false }: { testimonials: Testimony[]; reverse?: boolean }) {
  // Duplicate testimonials for seamless loop
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden">
      <div 
        className="flex gap-6 select-none"
        style={{
          animation: `scroll ${reverse ? '30s' : '30s'} linear infinite ${reverse ? 'reverse' : ''}`,
          width: 'fit-content'
        }}
      >
        {loopedTestimonials.map((t, idx) => (
          <Card key={`${t.id}-${idx}`} className="flex-shrink-0 w-80 shadow-sm border bg-card p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-base">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.position}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">"{t.body}"</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{new Date(t.createdAt).toLocaleDateString()}</span>
              {renderStars(t.star)}
            </div>
          </Card>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}


export default function TestimoniSlider() {
  const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/testimonies.json');
        if(!res.ok) throw new Error('Gagal memuat testimoni.');
        const data = await res.json();
        console.log('🔍 data:', data);
        
        // Filter hanya testimony yang isConfirmed === true
        const confirmedTestimonials = data.filter((t: any) => t.isConfirmed === true);
        setTestimonials(confirmedTestimonials);
        
        setError(null);
      } catch (err) {
        console.error('❌ ERROR saat memanggil getTestimonies()!');
        console.error('❌ Error detail:', err);
        console.error('❌ Error message:', err instanceof Error ? err.message : 'Unknown error');
        console.error('❌ Error stack:', err instanceof Error ? err.stack : 'No stack trace');
        
        setError("Gagal memuat testimoni.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p>Memuat testimoni...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500">{error}</p>
          <p className="text-sm mt-2 text-error">Gagal</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="w-full py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">Belum ada testimoni.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Cerita Mereka</h2>
        <p className="text-muted-foreground text-center mb-8">Ikuti pengalaman mereka di Saadatuddarein.</p>
        
        <div className="space-y-6">
          <TestimonialRow testimonials={testimonials} />
          
          <div className="hidden md:block">
            <TestimonialRow testimonials={testimonials} reverse />
          </div>

          <div className="flex justify-center mt-8">
            <a href="/testimony" >
              <Button size="lg" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Tambahkan Ceritamu dengan Saadatuddaraein
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}