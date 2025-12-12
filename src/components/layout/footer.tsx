import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUp } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function SchoolFooter({ description, telephone, email, address }: {description: string; telephone: string; email: string; address: string }) {
  return (
    <footer className="w-full border-t bg-background mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile */}
          <div>
            <h3 className="text-lg font-semibold">Profil Sekolah</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-lg font-semibold">Informasi</h3>
            <ul className="space-y-2 mt-3 text-sm">
              <li><a href="/blog" className="hover:text-primary transition">Blog</a></li>
              <li><a href="/gallery" className="hover:text-primary transition">Galeri</a></li>
              <li><a href="/video" className="hover:text-primary transition">Video</a></li>
            </ul>
          </div>

          {/* Akademik */}
          <div>
            <h3 className="text-lg font-semibold">Akademik</h3>
            <ul className="space-y-2 mt-3 text-sm">
              <li><a href="/academic/stage" className="hover:text-primary transition">Jenjang Pendidikan</a></li>
              <li><a href="/about/teachers" className="hover:text-primary transition">Daftar Guru</a></li>
              <li><a href="/academic/extracurricular" className="hover:text-primary transition">Ekstrakurikuler</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold">Kontak</h3>
            <ul className="space-y-2 mt-3 text-sm">
              <li>{address}</li>
              <li>Email: {email}</li>
              <li>Telepon: {telephone}</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Sekolah Ku. Semua hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Back to top */}
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="w-4 h-4" />
              Kembali ke Atas
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
