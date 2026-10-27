// app/stories/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STORIES_DATA } from "@/lib/stories-data";

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = STORIES_DATA[slug.toLowerCase()];

  if (!story) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      {/* Editorial Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-6">
        <ol className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Sabah
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/stories" className="hover:text-stone-900 transition-colors">
              Stories
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {story.category}
          </li>
        </ol>
      </nav>

      {/* Story Header */}
      <header className="pb-10 border-b border-[#E5E0D8]">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
          <span className="text-amber-800 font-medium">{story.category}</span>
          <div className="flex items-center gap-3">
            <span>{story.readTime}</span>
            <StatusBadge status="Official latest" />
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-950 leading-[1.1] mb-6">
          {story.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-sans mb-8">
          {story.dek}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-[#E5E0D8] text-xs font-mono text-stone-500">
          <span>By {story.author}</span>
          <span>Published {story.date}</span>
        </div>
      </header>

      {/* Content */}
      <div className="py-12 space-y-12">
        {story.content.map((section, idx) => (
          <section key={idx} className="space-y-6">
            {section.sectionTitle && (
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 pt-4">
                {section.sectionTitle}
              </h2>
            )}

            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-stone-800 text-base sm:text-lg leading-[1.8] font-sans"
              >
                {p}
              </p>
            ))}

            {section.callout && (
              <div className="my-8 p-6 bg-[#F3F0EA] border border-[#E5E0D8] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
                    {section.callout.label}
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed max-w-md">
                    {section.callout.detail}
                  </p>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-[#E5E0D8] pt-3 sm:pt-0 sm:pl-6">
                  <p className="font-mono text-3xl font-semibold text-amber-800">
                    {section.callout.value}
                  </p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Footer Navigation */}
      <footer className="pt-8 border-t border-[#E5E0D8] flex items-center justify-between">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 hover:underline"
        >
          <span aria-hidden="true">←</span> Back to all stories
        </Link>
        <Link
          href="/districts"
          className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 hover:underline"
        >
          Inspect Sabah&apos;s 27 districts <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}