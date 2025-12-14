import React from "react";
import { Card } from "@/components/ui/card";

interface Testimony {
  id: number;
  name: string;
  position: string;
  body: string;
  createdAt: string;
  star: number;
  isConfirmed?: boolean;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

export default function CardTestimonies({ item }: { item: Testimony }) {
  return (
    <Card className="h-full shadow-sm border bg-card p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-base">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.position}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4 flex-grow">"{item.body}"</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
        <span>
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {renderStars(item.star)}
      </div>
    </Card>
  );
}