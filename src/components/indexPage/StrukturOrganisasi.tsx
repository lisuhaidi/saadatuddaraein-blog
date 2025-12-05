import { Card } from "@/components/ui/card";
import { Mail, Phone, Facebook } from "lucide-react";

const organizationData = [
  {
    id: 1,
    name: "Dr. H. Ahmad Fauzi, M.Pd",
    position: "Kepala Yayasan",
    bio: "Pemimpin yayasan dengan pengalaman 20 tahun dalam pendidikan Islam modern dan manajemen pesantren.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    email: "ahmad.fauzi@saadatuddaraein.sch.id",
    phone: "+62 812-3456-7890",
    Facebook: "#",
  },
  {
    id: 2,
    name: "Usth. Siti Fatimah, S.Pd.I",
    position: "Kepala Madrasah Aliyah",
    bio: "Pendidik berpengalaman dengan fokus pada pengembangan akademik dan pembinaan karakter siswa.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    email: "siti.fatimah@saadatuddaraein.sch.id",
    phone: "+62 813-4567-8901",
    Facebook: "#",
  },
  {
    id: 3,
    name: "Ustadz Muhammad Rahman, S.Pd",
    position: "Kepala Madrasah Tsanawiyah",
    bio: "Dedikasi dalam menciptakan lingkungan belajar yang kondusif dan menyenangkan untuk siswa.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    email: "muhammad.rahman@saadatuddaraein.sch.id",
    phone: "+62 814-5678-9012",
    Facebook: "#",
  },
  {
    id: 4,
    name: "Ustadz Yusuf Hidayat, Lc",
    position: "Koordinator Rumah Tahfiz",
    bio: "Hafiz 30 juz dengan metode pembelajaran yang efektif dan menyenangkan untuk santri.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    email: "yusuf.hidayat@saadatuddaraein.sch.id",
    phone: "+62 815-6789-0123",
    Facebook: "#",
  },
  {
    id: 5,
    name: "Ustadzah Aisyah Nurjanah, S.Pd.I",
    position: "Koordinator TPQ",
    bio: "Spesialis pendidikan Al-Qur'an untuk anak usia dini dengan pendekatan yang ramah dan sabar.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    email: "aisyah.nurjanah@saadatuddaraein.sch.id",
    phone: "+62 816-7890-1234",
    Facebook: "#",
  },
  {
    id: 6,
    name: "Ustadz Hasan Basri, S.Kom",
    position: "Kepala Bidang IT & Media",
    bio: "Mengintegrasikan teknologi dalam pembelajaran dan mengelola sistem informasi yayasan.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    email: "hasan.basri@saadatuddaraein.sch.id",
    phone: "+62 817-8901-2345",
    Facebook: "#",
  },
  {
    id: 7,
    name: "Ibu Nurul Hidayah, S.E",
    position: "Kepala Administrasi & Keuangan",
    bio: "Mengelola administrasi dan keuangan yayasan dengan sistem yang transparan dan akuntabel.",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    email: "nurul.hidayah@saadatuddaraein.sch.id",
    phone: "+62 818-9012-3456",
    Facebook: "#",
  },
  {
    id: 8,
    name: "Ustadz Ridwan Kamil, S.Pd",
    position: "Koordinator Ekstrakurikuler",
    bio: "Membina dan mengembangkan bakat siswa melalui berbagai kegiatan ekstrakurikuler.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    email: "ridwan.kamil@saadatuddaraein.sch.id",
    phone: "+62 819-0123-4567",
    Facebook: "#",
  },
];

export default function OrganizationStructure() {
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Struktur Organisasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tim pengajar dan pengurus yang berpengalaman dan dedikasi tinggi dalam membimbing santri
          </p>
        </div>

        {/* Organization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizationData.map((member) => (
            <Card
              key={member.id}
              className="group relative overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 h-[500px]"
            >
              {/* Photo - covers top portion */}
              <div className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden bg-muted">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content - bottom portion with white background */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%] p-5 bg-card flex flex-col">
                {/* Name & Position */}
                <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium mb-3">
                  {member.position}
                </p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                  {member.bio}
                </p>

                {/* Contact Icons */}
                <div className="flex items-center gap-3 pt-3 border-t mt-auto">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Phone"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href={member.Facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}