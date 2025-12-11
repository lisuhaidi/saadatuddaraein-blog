import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Facebook } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import BlogCardSkeleton from "../blog/BlogCardSkeleton";

interface Teacher {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  position: string;
  description: string;
  socialMedia: string | null;
  email: string | null;
}

export default function OrganizationStructure() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchTeachers() {
      try {
        setLoading(true);
        const response = await axios.get("/api/teachers.json");
        const items = response?.data ?? [];

        if (mounted) {
          setTeachers(items);
        }
      } catch (err) {
        console.error("[OrganizationStructure] failed to load /api/teachers.json", err);
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchTeachers();

    return () => {
      mounted = false;
    };
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Struktur Organisasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tim pengajar dan pengurus yang berpengalaman dan dedikasi tinggi dalam membimbing santri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((member) => (
            <a
              key={member.id}
              href={`/about/teachers/${member.slug}`}
              className="group block h-full"
            > 
              <Card
                key={member.id}
                className="group relative overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 h-[500px] cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden bg-muted">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[40%] p-5 bg-card flex flex-col">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    {member.position}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                    {member.description}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t mt-auto">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialMedia && (
                      <a
                        href={member.socialMedia}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}