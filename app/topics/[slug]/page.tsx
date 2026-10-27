// app/topics/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TOPICS_DATA } from "@/lib/topics-data";
import { STORIES_DATA } from "@/lib/stories-data";

// Generate static routes at build time for ultimate Vercel performance
export function generateStaticParams() {
  return Object.keys(TOPICS_DATA).map((slug) => ({
    slug,
  }));
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const topic = TOPICS_DATA[slug.toLowerCase()];

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      {/* Editorial Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-6">
        <ol className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">Sabah</Link>
          </li>
          <li>/</li>
          <li>Topics</li>
          <li>/</li>
          <li className="text-stone-900 font-semibold">{topic.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="pb-10 border-b border-[#E5E0D8] mb-12">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
          <p>Topic Observatory</p>
          <p>Updated {topic.lastUpdated}</p>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-stone-950 leading-[1.08] mb-6">
          {topic.title}
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 max-w-3xl leading-relaxed">
          {topic.description}
        </p>
      </header>

      {/* 1. HERO METRIC */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-6 border-b border-[#E5E0D8] pb-2">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">{topic.heroMetric.title}</h2>
          <StatusBadge status={topic.heroMetric.status} />
        </div>
        
        <div className="bg-[#F3F0EA] border border-[#E5E0D8] rounded-lg p-6 sm:p-10">
          <div className="flex items-baseline gap-2 mb-4">
            <p className="font-mono text-6xl sm:text-7xl font-semibold text-stone-950">
              {topic.heroMetric.value}
            </p>
            {topic.heroMetric.unit && (
              <p className="font-mono text-xl text-stone-500">{topic.heroMetric.unit}</p>
            )}
          </div>
          <p className="text-stone-700 text-lg leading-relaxed max-w-2xl">
            {topic.heroMetric.context}
          </p>
        </div>
      </section>

      {/* 2. SECONDARY METRICS GRID */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topic.secondaryMetrics.map((metric, idx) => (
            <div key={idx} className="border border-[#E5E0D8] rounded-lg p-6 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-500">{metric.title}</p>
                  <StatusBadge status={metric.status} />
                </div>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <p className="font-mono text-4xl font-semibold text-stone-950">{metric.value}</p>
                  {metric.unit && <p className="font-mono text-sm text-stone-500">{metric.unit}</p>}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {metric.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RELATED STORIES */}
      {topic.relatedStorySlugs.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-6 border-b border-[#E5E0D8] pb-2">
            <h2 className="font-serif text-2xl text-stone-950">Related Stories</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {topic.relatedStorySlugs.map((storySlug) => {
              const story = STORIES_DATA[storySlug];
              if (!story) return null;
              
              return (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="group block border border-[#E5E0D8] rounded-lg p-6 hover:border-stone-400 transition-colors bg-white"
                >
                  <p className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2">
                    {story.category}
                  </p>
                  <h3 className="font-serif text-2xl text-stone-900 group-hover:text-amber-800 transition-colors mb-3">
                    {story.title}
                  </h3>
                  <p className="text-sm text-stone-600 max-w-3xl mb-4 line-clamp-2">
                    {story.dek}
                  </p>
                  <span className="text-xs font-mono font-medium text-stone-900">
                    Read the story →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}