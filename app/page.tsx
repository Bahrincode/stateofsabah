// app/page.tsx
import React from "react";
import Link from "next/link";
import { LIBRARY_CATEGORIES } from "@/lib/static-data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Sparkline } from "@/components/ui/Sparkline";
import { getLiveClimateData, getOfficialSabahData } from "@/lib/fetchers";
import SabahDashboardMap from "@/components/maps/SabahDashboardMap";
import DistrictSpotlight from "@/components/widgets/DistrictSpotlight";

export default async function StateOfSabahPage() {
  const climateData = await getLiveClimateData();
  const officialData = await getOfficialSabahData();

  const today = new Date().toLocaleDateString("en-MY", { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const stations = climateData?.stations || [];
  const hottest = climateData?.hottestStation || stations[stations.length - 1] || { name: "Sandakan", anomaly: "+1.6°C" };
  const coolest = climateData?.coolestStation || stations[0] || { name: "Keningau", anomaly: "+0.8°C" };
  const stateMean = climateData?.stateMeanAnomaly || "+1.2°C";

  return (
    <div className="text-[#141413]">
      <main id="top" className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* EDITORIAL HEADER & THE LIBRARY */}
        <header className="pt-12 pb-10 border-b border-[#E5E0D8]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
            <p>Sabah, in the present tense</p>
            <p>{today}</p>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-950 max-w-4xl leading-[1.08] mb-5">
            A beautifully designed, living portrait of Sabah.
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl leading-relaxed mb-10">
            Public data, turned into stories people can understand — what is happening from the Crocker Range to the Sulu Sea today, how it compares with normal, and what is changing underneath. Organised by life, not by agency.
          </p>

          <nav
            aria-label="The library"
            className="bg-[#F3F0EA]/70 border border-[#E5E0D8] rounded-lg p-5 sm:p-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-6 border-b border-[#E5E0D8]">
              {LIBRARY_CATEGORIES.map((category) => (
                <div key={category.title}>
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
                    {category.title}
                  </p>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between text-sm">
                        <Link
                          href={item.href}
                          className={`hover:underline ${
                            item.status === "Active"
                              ? "font-medium text-stone-950"
                              : "text-stone-600"
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.status === "Beta" ? (
                          <span className="text-[10px] font-mono text-stone-400">Beta</span>
                        ) : (
                          <span className="text-[10px] font-mono text-emerald-700 font-medium">
                            Live
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
              <p>
                Climate and Spatial Maps are chapter one — the rest of the Sabah library is being researched in the open.
              </p>
              <Link href="/maps" className="font-mono text-stone-900 hover:underline">
                Explore interactive maps →
              </Link>
            </div>
          </nav>
        </header>

        {/* HERO LIVE SECTION */}
        <section
          id="today"
          aria-label="Sabah today"
          className="py-10 border-b border-[#E5E0D8]"
        >
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Sabah today
              </p>
              <StatusBadge status="Live" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-3">
                  Sabah is warmer than normal today.
                </h2>
                <div className="flex items-baseline gap-4 mb-3">
                  <p className="font-mono text-5xl sm:text-6xl font-semibold tracking-tight text-amber-700">
                    {stateMean}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    vs 1991–2020 baseline
                  </span>
                </div>
                <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                  {climateData?.summaryDescription || "The state mean against the 1991–2020 normal for this date — read live from reference meteorological stations across Sabah."}
                </p>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#E5E0D8] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between">
                <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                  <strong className="text-stone-900 font-medium">{hottest.name}</strong> is the hottest station today at{" "}
                  <span className="font-mono text-amber-800">{hottest.anomaly}</span> above normal, while upland{" "}
                  <strong className="text-stone-900 font-medium">{coolest.name}</strong> sits at{" "}
                  <span className="font-mono">{coolest.anomaly}</span>.
                </p>
                <Link
                  href="/maps"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 hover:text-amber-800 transition-colors"
                >
                  Inspect station telemetry on map <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MAPS */}
        <SabahDashboardMap />

        {/* DISTRICT SPOTLIGHT */}
        <DistrictSpotlight />
      </main>
    </div>
  );
}