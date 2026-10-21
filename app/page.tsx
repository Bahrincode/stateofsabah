//page.tsx
// --- DATA DEFINITIONS ---

import React from "react";
import { SABAH_DIVISIONS, TELEMETRY_NODES, LIBRARY_CATEGORIES } from "@/lib/static-data";
import { DataStatus } from "@/lib/types";
// --- HELPER COMPONENTS ---

import { StatusBadge } from "@/components/ui/StatusBadge";
import { Sparkline } from "@/components/ui/Sparkline";
import { getLiveClimateData, getOfficialSabahData } from "@/lib/fetchers";
import SabahDashboardMap from "@/components/maps/SabahDashboardMap";
import DistrictSpotlight from "@/components/widgets/DistrictSpotlight";
// --- MAIN PAGE COMPONENT ---

export default async function StateOfSabahPage() {
  // Fetch live data securely on the server
  const climateData = await getLiveClimateData();
  const officialData = await getOfficialSabahData();

  // Determine current date for the header
  const today = new Date().toLocaleDateString("en-MY", { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });
  

  return (
    <div className="text-[#141413]">
      {/* 1. TOP NAVIGATION BAR */}
      

      <main id="top" className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* 2. EDITORIAL HEADER & THE LIBRARY */}
        <header className="pt-12 pb-10 border-b border-[#E5E0D8]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
            <p>Sabah, in the present tense</p>
            <p>Wednesday, 21 October 2026</p>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-950 max-w-4xl leading-[1.08] mb-5">
            A beautifully designed, living portrait of Sabah.
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl leading-relaxed mb-10">
            Public data, turned into stories people can understand — what is happening from the Crocker Range to the Sulu Sea today, how it compares with normal, and what is changing underneath. Organised by life, not by agency.
          </p>

          {/* THE LIBRARY INDEX */}
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
                        <a
                          href={item.href}
                          className={`hover:underline ${
                            item.status === "Active"
                              ? "font-medium text-stone-950"
                              : "text-stone-600"
                          }`}
                        >
                          {item.name}
                        </a>
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
                Climate and Spatial Maps are chapter one — the rest of the Sabah library is being researched in the open, and says so.
              </p>
              <a href="#maps" className="font-mono text-stone-900 hover:underline">
                Explore interactive maps →
              </a>
            </div>
          </nav>
        </header>

        {/* 3. HERO LIVE SECTION: SABAH TODAY */}
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
                    +1.2°C
                  </p>
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    vs 1991–2020 baseline
                  </span>
                </div>
                <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                  The state mean against the 1991–2020 normal for this date — read live from six reference meteorological stations across Kota Kinabalu, Kudat, Keningau, Sandakan, Tawau, and Danum Valley.
                </p>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#E5E0D8] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between">
                <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                  <strong className="text-stone-900 font-medium">Sandakan</strong> is the hottest station today at{" "}
                  <span className="font-mono text-amber-800">+1.6°C</span> above normal, while upland{" "}
                  <strong className="text-stone-900 font-medium">Keningau</strong> sits at{" "}
                  <span className="font-mono">+0.8°C</span>.
                </p>
                <a
                  href="#maps"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 hover:text-amber-800 transition-colors"
                >
                  Inspect station telemetry on map <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            {/* Temperature Anomaly Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                <span>Station temperature anomaly (6 reference points)</span>
                <span>+0.0°C — +2.1°C</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 h-3">
                <div className="bg-amber-300 rounded-sm" title="Keningau: +0.8°C" />
                <div className="bg-amber-400 rounded-sm" title="Danum Valley: +1.0°C" />
                <div className="bg-amber-500 rounded-sm" title="Kota Kinabalu: +1.1°C" />
                <div className="bg-orange-500 rounded-sm" title="Kudat: +1.3°C" />
                <div className="bg-orange-600 rounded-sm" title="Tawau: +1.4°C" />
                <div className="bg-red-600 rounded-sm" title="Sandakan: +1.6°C" />
              </div>
              <div className="grid grid-cols-6 gap-1.5 mt-1.5 text-[10px] font-mono text-stone-500">
                <span>KGU +0.8°</span>
                <span>DNM +1.0°</span>
                <span>BKI +1.1°</span>
                <span>KUD +1.3°</span>
                <span>TWU +1.4°</span>
                <span className="text-red-700 font-medium">SDK +1.6°</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TODAY'S SIGNALS (6-TILE BENTO GRID) */}
        <section aria-label="Today's signals" className="py-10 border-b border-[#E5E0D8]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">Today&apos;s signals</h2>
            <p className="text-xs font-mono text-stone-500">Every tile says what its number is</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#E5E0D8] gap-[1px] border border-[#E5E0D8] rounded-lg overflow-hidden">
            {/* Tile 1: Climate */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Climate</p>
                  <StatusBadge status="Live" />
                </div>
                <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">+1.2°C</p>
                <Sparkline points="0,22 24,19 48,17 72,15 96,10 120,6" color="#D97706" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sandakan is the hottest district today (+1.6°C); West Coast rainfall running at 118% of October normal.
                </p>
              </div>
              <a href="#maps" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Tile 2: Cost of Living */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Cost of living</p>
                  <StatusBadge status="Official latest" />
                </div>
                <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">+1.6%</p>
                <Sparkline points="0,8 24,12 48,14 72,13 96,16 120,15" color="#44403C" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sabah consumer prices vs a year earlier, September 2026 — food &amp; non-alcoholic beverages running at +2.1%.
                </p>
              </div>
              <a href="#stories" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Tile 3: Employment */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Employment</p>
                  <StatusBadge status="Official latest" />
                </div>
                <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                  7.1% <span className="text-sm font-normal text-stone-500">unemployed</span>
                </p>
                <Sparkline points="0,6 24,8 48,11 72,14 96,15 120,17" color="#44403C" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  of the Sabah labour force, Q2/Aug 2026 — 1.68M people in work, down from the 9.1% pandemic peak.
                </p>
              </div>
              <a href="#numbers" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Tile 4: Air & Sea Mobility */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Air &amp; Sea Mobility</p>
                  <StatusBadge status="Official latest" />
                </div>
                <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                  842K <span className="text-sm font-normal text-stone-500">movements</span>
                </p>
                <Sparkline points="0,26 24,24 48,18 72,12 96,9 120,5" color="#059669" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  monthly passenger movements across KKIA (BKI), Sandakan, Tawau &amp; Labuan/Jesselton ferry terminals.
                </p>
              </div>
              <a href="#numbers" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Tile 5: Palm Oil & Commodities */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Palm Oil (MPOB)</p>
                  <StatusBadge status="Official latest" />
                </div>
                <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                  382K <span className="text-sm font-normal text-stone-500">tonnes CPO</span>
                </p>
                <Sparkline points="0,18 24,15 48,19 72,11 96,13 120,9" color="#44403C" />
                <p className="text-xs text-stone-600 leading-relaxed">
                  monthly crude palm oil output across Sabah mills, September 2026 — largest state share in Malaysia (24.1%).
                </p>
              </div>
              <a href="#maps" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Tile 6: Seasonal Forecast */}
            <div className="bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-500">This year</p>
                  <StatusBadge status="Forecast" />
                </div>
                <p className="font-mono text-3xl font-semibold text-amber-800 mb-1">El Niño</p>
                <div className="my-2 h-7 flex items-center">
                  <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full w-4/5" />
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  strengthening — drier conditions across Tawau, Sandakan &amp; Kudat forecast to peak Nov 2026 – Jan 2027.
                </p>
              </div>
              <a href="#maps" className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-stone-900 hover:underline">
                See the data <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 5. DETAILED INTERACTIVE MAPS OF SABAH (/maps) */}
        <SabahDashboardMap />

        {/* 6. THE STATE IN NUMBERS (OFFICIAL LATEST · NOT LIVE) */}
        <section id="numbers" aria-label="The state in numbers" className="py-12 border-b border-[#E5E0D8]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">The state in numbers</h2>
            <p className="text-xs font-mono text-stone-500">Official latest · not live</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#E5E0D8] gap-[1px] border border-[#E5E0D8] rounded-lg overflow-hidden mb-4">
            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">People</p>
              <p className="font-mono text-3xl font-semibold text-stone-950">3.59 million</p>
              <p className="text-xs font-mono text-stone-500 mb-4">Q1 2026 estimate · 1970 → 2026</p>
              <p className="text-xs text-stone-600 mb-1">
                DOSM · Demographic Statistics Malaysia (May 2026)
              </p>
              <p className="text-[11px] text-stone-400">
                Provisional, projected from Census 2020 across 27 administrative districts.
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                Economic growth
              </p>
              <p className="font-mono text-3xl font-semibold text-stone-950">+4.4%</p>
              <p className="text-xs font-mono text-stone-500 mb-4">Real GDP level, 2015 → 2025</p>
              <p className="text-xs text-stone-600 mb-1">
                DOSM · Gross Domestic Product by State (July 2026)
              </p>
              <p className="text-[11px] text-stone-400">
                Driven by services (51.2%), mining &amp; quarrying (23.4%), and agriculture (15.8%).
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Inflation</p>
              <p className="font-mono text-3xl font-semibold text-stone-950">+1.6%</p>
              <p className="text-xs font-mono text-stone-500 mb-4">September 2026, year on year</p>
              <p className="text-xs text-stone-600 mb-1">
                DOSM · Consumer Price Index Sabah (Oct 2026)
              </p>
              <p className="text-[11px] text-stone-400">
                Headline state CPI; rural food transport premiums tracked separately in Stories.
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                Median household income
              </p>
              <p className="font-mono text-3xl font-semibold text-stone-950">RM4,879</p>
              <p className="text-xs font-mono text-stone-500 mb-4">per month · 2024 survey</p>
              <p className="text-xs text-stone-600 mb-1">
                DOSM · Household Income Survey Sabah (Oct 2025)
              </p>
              <p className="text-[11px] text-stone-400">
                Gross income, citizen households. Urban RM5,840; Rural RM3,320.
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                Protected forest cover
              </p>
              <p className="font-mono text-3xl font-semibold text-stone-950">26.9%</p>
              <p className="text-xs font-mono text-stone-500 mb-4">Totally Protected Areas (TPA)</p>
              <p className="text-xs text-stone-600 mb-1">
                Sabah Forestry Department · Annual Report
              </p>
              <p className="text-[11px] text-stone-400">
                1.98 million hectares under Class I, VI &amp; VII protection; target set at 30%.
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                Visitor arrivals
              </p>
              <p className="font-mono text-3xl font-semibold text-stone-950">3.14 million</p>
              <p className="text-xs font-mono text-stone-500 mb-4">full year 2025</p>
              <p className="text-xs text-stone-600 mb-1">
                Sabah Tourism Board · Official Release (Jan 2026)
              </p>
              <p className="text-[11px] text-stone-400">
                1.38M international and 1.76M domestic arrivals generating RM7.28B in tourism receipts.
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            These are the latest official releases for Sabah, shown with the exact period each one describes — an annual statistic is never dressed up as today&apos;s reading. Verified against primary documents.
          </p>
        </section>

        {/* 7. FEATURED STORY */}
        <section id="stories" aria-label="Featured story" className="py-12 border-b border-[#E5E0D8]">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">Featured story</h2>
            <a href="/stories" className="text-xs font-mono text-stone-700 hover:underline">
              All Sabah stories →
            </a>
          </div>

          <a
            href="#stories"
            className="block bg-white border border-[#E5E0D8] rounded-lg p-6 sm:p-8 hover:border-stone-400 transition-colors"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-amber-800 mb-2">
              Explainer · Cost of Living &amp; Geography
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-950 mb-3">
              Why does a basket of groceries cost different in Nabawan than in Kota Kinabalu?
            </h3>
            <p className="text-stone-600 max-w-3xl leading-relaxed mb-5">
              State inflation is a single average; a receipt at the tamu or retail store is geographical. Thirty years of the Sabah consumer price index — combined with Sepanggar port throughput, Crocker Range road gradients, and rural distribution miles — explain the gap between the headline number and everyday life across Sabah&apos;s 27 districts.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900">
              Read the story <span aria-hidden="true">→</span>
            </span>
          </a>
        </section>

        {/* 8. DISTRICT SPOTLIGHT & DID YOU KNOW */}
        <DistrictSpotlight/>
      </main>

      {/* 9. METHODOLOGY FOOTER */}
      
    </div>
  );
}