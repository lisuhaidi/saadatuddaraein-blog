import React from 'react';

export default function VisiMisiContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Visi Section */}
      <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">Visi</h3>
            <div className="h-1 w-20 bg-primary rounded"></div>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Menjadi lembaga pendidikan Islam yang unggul dalam membentuk generasi berakhlak mulia, berilmu, dan berwawasan global, yang mampu memberikan kontribusi positif bagi kemajuan umat dan bangsa.
        </p>
      </div>

      {/* Misi Section */}
      <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2">Misi</h3>
            <div className="h-1 w-20 bg-primary rounded"></div>
          </div>
        </div>
        <ul className="space-y-4">
          {[
            'Menyelenggarakan pendidikan Islam yang berkualitas dengan pendekatan modern dan berbasis nilai-nilai tradisional',
            'Membentuk karakter santri yang berakhlakul karimah, bertaqwa, dan berilmu pengetahuan',
            'Mengembangkan potensi akademik dan non-akademik santri secara optimal',
            'Membangun lingkungan pembelajaran yang kondusif, inovatif, dan berwawasan teknologi',
            'Menjalin kerjasama dengan berbagai pihak untuk kemajuan pendidikan Islam'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                {index + 1}
              </div>
              <p className="text-muted-foreground leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}