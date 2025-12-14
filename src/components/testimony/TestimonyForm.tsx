import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from '@/components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TestimonyForm() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    content: '',
    rating: "5"
  });
  const [positionType, setPositionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      rating: value
    }));
  };

  const handlePositionTypeChange = (value: string) => {
    setPositionType(value);
    if (value !== "Lainnya") {
      setFormData(prev => ({
        ...prev,
        position: value
      }));
    } else {
      setFormData(prev => ({ ...prev, position: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/submit-testimony', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal mengirim data');

      setIsSuccessOpen(true);
      
      // Reset form
      setFormData({ name: '', position: '', content: '', rating: "5" });
      setPositionType("");

    } catch (error) {
      console.error(error);
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Kirim Testimoni</CardTitle>
        <CardDescription>Bagikan pengalaman Anda bersama kami.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={positionType} onValueChange={handlePositionTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                  <SelectItem value="Wali Santri">Wali Santri</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {positionType === "Lainnya" && (
                <Input
                  name="position"
                  placeholder="Masukkan posisi/jabatan Anda"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={formData.rating} onValueChange={handleRatingChange}>
              <SelectTrigger id="rating">
                <SelectValue placeholder="Pilih Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                <SelectItem value="3">⭐⭐⭐</SelectItem>
                <SelectItem value="2">⭐⭐</SelectItem>
                <SelectItem value="1">⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Isi Testimoni</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Ceritakan pengalaman Anda..."
              value={formData.content}
              onChange={handleChange}
              required
              maxLength={400}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <><Spinner className="mr-2" /> Mengirim...</>
            ) : (
              "Kirim Testimoni"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>

    {/* Dialog Sukses */}
    <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Berhasil!</DialogTitle>
          <DialogDescription>
            Terima kasih! Testimoni Anda telah berhasil dikirim.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <a href='/'>
            <Button onClick={() => setIsSuccessOpen(false)}>Tutup</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Dialog Error */}
    <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gagal</DialogTitle>
          <DialogDescription>
            Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi nanti.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <a href='/'>
            <Button variant="destructive" onClick={() => setIsErrorOpen(false)}>Tutup</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
