import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "1",
    question: "Apa saja persyaratan untuk menjadi santri di Saadatuddaraein?",
    answer: "Persyaratan menjadi santri meliputi: fotokopi Kartu Keluarga, fotokopi Akta Kelahiran, fotokopi Ijazah terakhir, pas foto terbaru ukuran 3x4 (4 lembar), surat keterangan sehat dari dokter, dan formulir pendaftaran yang telah diisi lengkap. Calon santri juga akan mengikuti tes seleksi berupa tes baca Al-Qur'an, wawancara, dan tes akademik dasar.",
  },
  {
    id: "2",
    question: "Berapa biaya pendidikan di Saadatuddaraein?",
    answer: "Biaya pendidikan bervariasi tergantung jenjang yang dipilih. Untuk Madrasah Tsanawiyah dan Aliyah, biaya masuk berkisar Rp 3.000.000 - Rp 5.000.000 dengan SPP bulanan Rp 500.000 - Rp 750.000. Untuk program Rumah Tahfiz, biaya lebih detail dapat dikonsultasikan langsung dengan bagian administrasi. Kami juga menyediakan program beasiswa bagi santri berprestasi dan kurang mampu.",
  },
  {
    id: "3",
    question: "Apakah santri wajib tinggal di asrama?",
    answer: "Untuk program Madrasah Aliyah dan Rumah Tahfiz, santri diwajibkan tinggal di asrama untuk memaksimalkan proses pembelajaran dan pembinaan karakter. Sedangkan untuk Madrasah Tsanawiyah dan TPQ, santri dapat memilih antara program mondok (tinggal di asrama) atau pulang pergi. Fasilitas asrama meliputi kamar yang nyaman, makan 3 kali sehari, dan pendampingan 24 jam oleh ustadz/ustadzah.",
  },
  {
    id: "4",
    question: "Kurikulum apa yang digunakan di Saadatuddaraein?",
    answer: "Kami menggunakan kurikulum terpadu yang menggabungkan Kurikulum Nasional (Kemendikbud), Kurikulum Kemenag, dan kurikulum pesantren. Santri akan mendapatkan pembelajaran mata pelajaran umum seperti Matematika, IPA, IPS, Bahasa Indonesia dan Inggris, serta mata pelajaran keagamaan seperti Al-Qur'an Hadits, Fiqih, Akidah Akhlak, Bahasa Arab, dan Tahfiz Al-Qur'an. Metode pembelajaran dirancang interaktif dan aplikatif.",
  },
  {
    id: "5",
    question: "Bagaimana jadwal kunjungan orang tua dan komunikasi dengan santri?",
    answer: "Orang tua dapat mengunjungi santri setiap hari Minggu pukul 08.00 - 15.00 WIB. Untuk komunikasi sehari-hari, santri diperbolehkan menggunakan handphone pada waktu yang telah ditentukan (Sabtu dan Minggu). Kami juga rutin mengirimkan laporan perkembangan santri melalui buku penghubung dan grup WhatsApp orang tua. Selain itu, ada program pertemuan wali santri setiap 3 bulan sekali untuk evaluasi bersama.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum seputar pendaftaran dan program di Saadatuddaraein
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-background border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold text-base pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-10 text-center p-6 bg-background rounded-lg border">
          <p className="text-muted-foreground mb-4">
            Masih ada pertanyaan lain? Jangan ragu untuk menghubungi kami
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}