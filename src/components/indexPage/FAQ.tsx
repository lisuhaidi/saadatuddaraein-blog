import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/data/faq.json";


interface Faq {
  id: number;
  answer: string;
  question: string;
  no: number;
}

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
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={String(faq.no)}
              className="bg-background border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold text-base pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-10 text-center p-6 bg-background rounded-lg border">
          <p className="text-muted-foreground mb-4">Masih ada pertanyaan lain? Jangan ragu untuk menghubungi kami</p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
