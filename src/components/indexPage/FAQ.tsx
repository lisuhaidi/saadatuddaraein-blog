import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Spinner } from "../ui/spinner";
import { Skeleton } from "../ui/skeleton";

interface Faq {
  id: number;
  answer: string;
  question: string;
  no: number;
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchFaqs() {
      try {
        const response = await axios.get("/api/faq.json");
        const payload = response?.data ?? null;

        // Support multiple shapes: array, { data: [...] }, { faqs: [...] }
        let items: any[] = [];
        if (Array.isArray(payload)) items = payload;
        else if (Array.isArray(payload?.data)) items = payload.data;
        else if (Array.isArray((payload as any)?.faqs)) items = (payload as any).faqs;
        else if (payload?.data?.data) items = payload.data.data;

        const normalized: Faq[] = (items || [])
          .map((it: any, idx: number) => {
            if (!it) return null;
            if (it.attributes) {
              const a = it.attributes;
              return {
                id: it.id ?? idx,
                question: a.question ?? a.title ?? "",
                answer: a.answer ?? a.body ?? "",
                no: a.no ?? idx + 1,
              } as Faq;
            }

            return {
              id: it.id ?? idx,
              question: it.question ?? it.title ?? "",
              answer: it.answer ?? it.body ?? "",
              no: it.no ?? idx + 1,
            } as Faq;
          })
          .filter(Boolean) as Faq[];

        if (mounted) setFaqs(normalized);
      } catch (err) {
        console.error("[FAQ] failed to load /api/faq.json", err);
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchFaqs();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
  return (
    <section className="w-full py-16 bg-background flex flex-col items-center justify-center space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
    </section>
  );
}


  if (error) {
    return (
        <section className="w-full py-16 bg-background flex flex-col items-center justify-center space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </section>

    );
  }

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
