// app/districts/page.tsx
import React from "react";
import Link from "next/link";
import { SABAH_DISTRICTS_DATA } from "./[slug]/page";

const DIVISIONS = ["West Coast", "Sandakan", "Tawau", "Interior", "Kudat"] as const;

export const metadata = {
  title: "Districts of Sabah — State of Sabah",
  description: "Directory and comparative baseline metrics across all 27 administrative districts of Sabah.",
};

export default function DistrictsIndexPage() {
  const districtEntries = Object.entries(SABAH_DISTRICTS_DATA);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      {/* Editorial Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-4">
        <ol className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Sabah
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-semibold">Districts (27)</li>
        </ol>
      </nav>

      {/* Directory Header */}
      

      {/* Grouped by Division */}
      <div className="space-y-14 pt-10">
        {DIVISIONS.map((division) => {
          const districtsInDivision = districtEntries.filter(
            ([, item]) => item.division === division
          );

          return (
            <section key={division} aria-labelledby={`division-${division.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-baseline justify-between border-b border-[#E5E0D8] pb-3 mb-6">
                <h2
                  id={`division-${division.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-serif text-2xl sm:text-3xl text-stone-950"
                >
                  {division} Division
                </h2>
                <span className="text-xs font-mono text-stone-500">
                  {districtsInDivision.length} {districtsInDivision.length === 1 ? "district" : "districts"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#E5E0D8] gap-[1px] border border-[#E5E0D8] rounded-lg overflow-hidden">
                {districtsInDivision.map(([slug, district]) => (
                  <Link
                    key={slug}
                    href={`/districts/${slug}`}
                    className="bg-white p-6 flex flex-col justify-between hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                          {district.division}
                        </span>
                        <span className="text-xs font-mono text-amber-800">
                          {district.tempAnomaly}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-stone-950 mb-2 group-hover:text-emerald-900 transition-colors">
                        {district.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-6">
                        {district.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E0D8]">
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <p className="text-stone-400 font-mono text-[10px] uppercase">People</p>
                          <p className="font-mono font-semibold text-stone-900">{district.population}</p>
                        </div>
                        <div>
                          <p className="text-stone-400 font-mono text-[10px] uppercase">Median Income</p>
                          <p className="font-mono font-semibold text-stone-900">{district.medianIncome}</p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-stone-900 group-hover:underline">
                        View profile <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}