import React from 'react';
import aboutData from '@/data/about.json';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function KontakContent() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* CTA Section */}
      <div className="rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Mari Bergabung Bersama Kami
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Kami siap menjawab pertanyaan Anda dan membantu Anda memulai perjalanan yang bermakna bersama Saadatuddaraein.
          </p>
          <a
            href={`https://wa.me/${aboutData.telephone}?text=${aboutData.whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Alamat */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg mb-2">Alamat</h3>
              <p className="text-muted-foreground">
                {aboutData.address}
              </p>
            </div>
          </div>
        </div>

        {/* Telepon */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg mb-2">Telepon</h3>
              <p className="text-muted-foreground">
                {aboutData.telephone}
              </p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg mb-2">Email</h3>
              <p className="text-muted-foreground">
                {aboutData.email}
              </p>
            </div>
          </div>
        </div>

        {/* Jam Operasional */}
        <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg mb-2">Jam Operasional</h3>
              <p className="text-muted-foreground">
                Senin - Jumat: 08:00 - 16:00<br />
                Sabtu: 08:00 - 14:00<br />
                Minggu: Tutup
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 bg-card rounded-xl p-6 shadow-sm text-center">
        <h3 className="font-semibold text-card-foreground text-lg mb-4">Ikuti Kami</h3>
        <div className="flex justify-center gap-4">
          <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}