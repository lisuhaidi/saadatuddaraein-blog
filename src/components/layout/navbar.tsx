import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { getMe,logout } from "@/lib/authApi/authApi";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

interface User {
  name: string
  role: string
}


export default function Navbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  
  // ambil daftar category
  useEffect(() => {
    axios.get<{ data: Category[] }>('/api/listCategories.json')
      .then(response => {
        setCategories(response.data.reverse());
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // verifikasi login
  useEffect(() => {
    let mounted = true

    getMe()
      .then((user) => {
        if (mounted) setUser(user)
      })
      .catch(() => {
        if (mounted) setUser(null)
      })
      .finally(() => {
        if (mounted) setCheckingAuth(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const handleLogout = async () => {
    try {
      const res = await logout()
      console.log(res.data)
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      setUser(null)
      window.location.href = '/'
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">

        {/* Logo */}
        <a href="/" className="text-xl font-bold">{title}</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          <a href="/" className="hover:text-primary transition">Beranda</a>

          <DropdownMenu>
            <DropdownMenuTrigger  asChild>
              <button className="flex items-center gap-1 hover:text-primary transition" >
                Informasi
                <ChevronDown className="size-4 transition duration-200 data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <a href="/blog">Semua</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <a href={`/blog/category/${category.slug}`}>{category.name}</a>
                  </DropdownMenuItem>
                ))}
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
                  <a href="/about/teachers">Ustadz/ah</a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Jenjang Pendidikan</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem asChild>
                          <a href="/academic/stage/mts">Madrasah Tsanawiyah</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/stage/ma">Madrasah Aliyah</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/stage/tahfiz">Rumah Tahfiz</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/academic/stage/tpq">TPQ</a>
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
          <a href="/gallery" className="hover:text-primary transition">Galeri</a>
          <a href="/video" className="hover:text-primary transition">Video</a>
          <a href="/about" className="hover:text-primary transition">Tentang</a>

          {!checkingAuth && !user && (
            <>
              <Button asChild>
                <a href="/auth/login">Masuk</a>
              </Button>

              <Button asChild variant="outline">
                <a href="/auth/register">Daftar</a>
              </Button>
            </>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 font-medium hover:text-primary">
                  {user.name}
                  <ChevronDown className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                
                {user.role ==='ADMIN' && <DropdownMenuItem asChild>
                  <a href="/admin">Dashboar Admin</a>
                </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
                  href="/blog"
                  className="block pl-4 py-2 text-base hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Semua
                </a>
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {category.name}
                  </a>
                ))}
              </MobileDropdown>

              <MobileDropdown label="Edukasi">
                <a
                  href="/about/teachers"
                  className="block pl-4 py-2 text-base"
                  onClick={() => setOpen(false)}
                >
                  Ustadz/ah
                </a>
                <MobileDropdown label="Jenjang Pendidikan" className="block pl-4 py-2 text-base">
                  <a
                    href="/academic/stage/mts"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Madrasah Tsanawiyah
                  </a>
                  <a
                    href="/academic/stage/ma"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Madrasah Aliyah
                  </a>
                  <a
                    href="/academic/stage/tahfiz"
                    className="block pl-4 py-2 text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Rumah Tahfiz
                  </a>
                  <a
                    href="/academic/stage/tpq"
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
              <a href="/gallery" className="hover:text-primary transition" onClick={() => setOpen(false)}>Galeri</a>
              <a href="/video" className="hover:text-primary transition" onClick={() => setOpen(false)}>Video</a>
              <a
                href="/about"
                className="hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                Tentang
              </a>

              {/* BUTTONS */}
              {!checkingAuth && !user && (
                <>
                  <Button asChild className="mt-4" onClick={() => setOpen(false)}>
                    <a href="/auth/login">Masuk</a>
                  </Button>

                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <a href="/auth/register">Daftar</a>
                  </Button>
                </>
              )}

              {user && (
                <>
                  <div className="mt-4 font-semibold">
                    Halo, {user.name}
                  </div>
                  
                  {user.role ==='ADMIN' && (
                    <a
                    href="/admin"
                    className="text-base hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard Admin
                  </a>
                  )}
                  
                  <button
                    className="text-left text-red-600"
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                  >
                    Keluar
                  </button>
                </>
              )}

            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
