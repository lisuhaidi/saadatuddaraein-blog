import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  MobileDropdown,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">

        {/* Logo */}
        <a href="/" className="text-xl font-bold">{title}</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          <a href="/" className="hover:text-primary transition">Beranda</a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 hover:text-primary transition">
                Informasi
                <ChevronDown className="size-4 transition duration-200 data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <a href="/info/announcements">Pengumuman</a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a href="/info/news">Berita</a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a href="/info/galleries">Galeri</a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 hover:text-primary transition">
                Edukasi
                <ChevronDown className="size-4 transition duration-200 data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <a href="/academic/teachers">Ustadz/ah</a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Kurikulum</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem asChild>
                          <a href="/academic/tsanawiyah-school">Madrasah Tsanawiyah</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/aliyah-school">Madrasah Aliyah</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/tahfiz-center">Rumah Tahfiz</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/tpq">TPQ</a>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a href="/academic/extracurricular">Ekstrakurikuler</a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/about" className="hover:text-primary transition">Tentang</a>
          <a href="/contact" className="hover:text-primary transition">Kontak</a>

          <Button asChild>
            <a href="/auth/login">Masuk</a>
          </Button>

          <Button asChild variant="outline">
            <a href="/auth/register">Daftar</a>
          </Button>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="p-6 w-64">
            <nav className="flex flex-col gap-4 mt-4 text-lg">

              {/* Beranda */}
              <a
                href="/"
                className="hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                Beranda
              </a>

              {/* INFORMASI - ACCORDION STYLE */}
              <MobileDropdown label="Informasi">
                <a
                  href="/info/announcements"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Pengumuman
                </a>
                <a
                  href="/info/news"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Berita
                </a>
                <a
                  href="/info/galleries"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Galeri
                </a>
              </MobileDropdown>

              <MobileDropdown label="Edukasi">
                <a
                  href="/academic/teachers"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Ustadz/ah
                </a>
                <MobileDropdown label="Kurikulum" className="block pl-4 py-2 text-base hover:text-primary">
                  <a
                    href="/academic/tsanawiyah-school"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Madrasah Tsanawiyah
                  </a>
                  <a
                    href="/academic/aliyah-school"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Madrasah Aliyah
                  </a>
                  <a
                    href="/academic/tahfiz-center"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Rumah Tahfiz
                  </a>
                  <a
                    href="/academic/tpq"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    TPQ
                  </a>
                </MobileDropdown>
                <a
                  href="/academic/extracurricular"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Ekstrakurikuler
                </a>
              </MobileDropdown>

              {/* Biasa */}
              <a
                href="/about"
                className="hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                Tentang
              </a>

              <a
                href="/contact"
                className="hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                Kontak
              </a>

              {/* BUTTONS */}
              <Button asChild className="mt-4" onClick={() => setOpen(false)}>
                <a href="/auth/login">Masuk</a>
              </Button>

              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <a href="/auth/register">Daftar</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
