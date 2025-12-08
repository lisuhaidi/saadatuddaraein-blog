import { Card } from "@/components/ui/card";
import { MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
// data untuk component ini ada di src/data/about.json

export default function CTAContactSection({telephone, email, address, gmapsURL}) {
  const whatsappMessage = encodeURIComponent("Assalamualaikum, saya ingin bertanya tentang pendaftaran santri baru di Saadatuddaraein");
  
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Telepon",
      value: telephone,
      link: `tel:${telephone}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: email,
      link: `mailto:${email}`,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Jam Operasional",
      value: "Senin - Jumat: 08.00 - 16.00 WIB",
      link: null,
    },
  ];

  return (
    <section className="w-full py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        {/* CTA Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Jadilah Santri Hebat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ribuan santri yang telah merasakan pendidikan berkualitas dengan nilai-nilai Islam yang kuat
          </p>
          
          {/* WhatsApp CTA Button */}
          <a
            href={`https://wa.me/${telephone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Hubungi Kami via WhatsApp
          </a>
        </div>

        {/* Contact & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <Card key={index} className="p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {contact.label}
                      </p>
                      {contact.link ? (
                        <a
                          href={contact.link}
                          className="text-base font-semibold hover:text-primary transition-colors break-words"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold break-words">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Address */}
            <Card className="p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Alamat
                  </p>
                  <p className="text-base font-semibold mb-2">
                    Yayasan Saadatuddaraein
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Map */}
          <div className="h-full min-h-[400px]">
            <Card className="h-full overflow-hidden shadow-sm">
              <iframe
                src={gmapsURL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Saadatuddaraein"
              ></iframe>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}