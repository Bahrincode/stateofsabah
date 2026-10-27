// app/topics/page.tsx
import React from "react";
import Link from "next/link";
import { TOPICS_DATA } from "@/lib/topics-data";

export const metadata = {
  title: "Topics — State of Sabah",
  description: "Observatories tracking the physical and economic realities of Sabah.",
};

export default function TopicsIndexPage() {
  // Convert the TOPICS_DATA object into an array we can map over
  const topics = Object.values(TOPICS_DATA);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-12">
      {/* Editorial Header */}
      <header className="pb-10 border-b border-[#E5E0D8] mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-800 mb-2">
          The Library 
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-stone-950 mb-6">
          Topics &amp; Observatories
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-3xl">
          Dedicated dashboards tracking the core pillars of Sabah&apos;s society. From macroeconomic stability and infrastructure to the physical realities of our changing climate.
        </p>
      </header>

      {/* Topics Feed */}
      <div className="space-y-10">
        {topics.map((topic) => (
          <article key={topic.slug} className="group border-b border-[#E5E0D8] pb-10 last:border-0">
            <Link href={`/topics/${topic.slug}`} className="block">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                  Topic Observatory
                </span>
                <span className="text-stone-300">|</span>
                <span className="text-xs font-mono text-stone-400">Updated {topic.lastUpdated}</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 group-hover:text-emerald-800 transition-colors mb-4">
                {topic.title}
              </h2>
              
              <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">
                {topic.description}
              </p>
              
              {/* Hero Metric Preview Badge */}
              <div className="inline-flex items-center gap-4 py-2.5 px-4 bg-[#F3F0EA] rounded border border-[#E5E0D8] mb-6 transition-colors group-hover:border-stone-300 group-hover:bg-[#EBE7DF]">
                 <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                   {topic.heroMetric.title}
                 </span>
                 <span className="font-mono font-medium text-stone-900">
                   {topic.heroMetric.value}{topic.heroMetric.unit}
                 </span>
              </div>
              
              <div className="block">
                <span className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 group-hover:underline">
                  Explore topic <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}