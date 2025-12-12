import React from 'react';

export default function MukaddimahContent() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Image Section */}
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVjdGlvbiUyMG9mJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
          alt="Saadatuddaraein Team"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Kisah kami dimulai dengan semangat keunggulan
        </h2>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Saadatuddaraein berawal dari sekelompok kecil profesional yang berdedikasi untuk membuat perubahan. Dengan semangat yang tinggi dan komitmen untuk memberikan yang terbaik, kami memulai perjalanan yang penuh makna.
          </p>
          
          <p>
            Melalui tahun-tahun kerja keras dan ketekunan, kami telah berkembang menjadi komunitas inovator dan pemecah masalah. Perjalanan kami ditandai dengan pembelajaran berkelanjutan, adaptasi, dan pengejaran kualitas yang tak kenal lelah dalam segala yang kami lakukan.
          </p>
          
          <p>
            Setiap langkah dalam perjalanan kami mencerminkan nilai-nilai yang kami pegang teguh: integritas, keunggulan, dan dedikasi untuk melayani dengan sepenuh hati.
          </p>
        </div>
      </div>
    </div>
  );
}