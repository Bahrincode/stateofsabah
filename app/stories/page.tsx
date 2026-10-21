import React from "react";
import { Metadata } from "next";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = {
  title: "Stories — State of Sabah",
  description: "Data journalism and explainers about Sabah.",
};

export default function StoriesPage() {
  const stories = [
    {
      slug: "grocery-bill-geography",
      title: "Why does a basket of groceries cost different in Nabawan than in Kota Kinabalu?",
      description: "State inflation is a single average; a receipt at the tamu or retail store is geographical. Thirty years of the Sabah consumer price index—combined with Sepanggar port throughput and rural distribution miles—explain the gap.",
      category: "Cost of Living & Geography",
      date: "October 2026",
    },
    {
      slug: "pan-borneo-pulse",
      title: "Tracking the pulse of the Pan-Borneo Highway",
      description: "How Phase 1A alignments are already shifting domestic supply chains between the West Coast and the Interior before the tarmac is even fully laid.",
      category: "Infrastructure",
      date: "September 2026",
    },
    {
      slug: "canopy-cooling",
      title: "The rainforest that recycles its own rain",
      description: "Canopy evapotranspiration across Danum Valley pumps moisture back into the boundary layer, buffering local drought stress during El Niño events.",
      category: "Climate & Ecology",
      date: "August 2026",
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-12">
      <header className="pb-10 border-b border-[#E5E0D8] mb-12">
        
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-800 mb-2">
          The Library · Chapter Two
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-stone-950 mb-6">
          Stories
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed">
          Numbers without context are just noise. We blend official statistics with geography, infrastructure, and climate data to explain what is actually happening underneath the surface in Sabah.
        </p>
      </header>

      <div className="space-y-10">
        {stories.map((story, i) => (
          <article key={i} className="group border-b border-[#E5E0D8] pb-10 last:border-0">
            <a href={`/stories/${story.slug}`} className="block">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                  {story.category}
                </span>
                <span className="text-stone-300">|</span>
                <span className="text-xs font-mono text-stone-400">{story.date}</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 group-hover:text-amber-800 transition-colors mb-4">
                {story.title}
              </h2>
              
              <p className="text-stone-600 leading-relaxed max-w-3xl mb-4">
                {story.description}
              </p>
              
              <span className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 group-hover:underline">
                Read the story <span aria-hidden="true">→</span>
              </span>
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}