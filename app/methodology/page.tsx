// app/methodology/page.tsx
import React from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata = {
  title: "Sources & Methodology — State of Sabah",
  description: "Transparency report detailing primary data sources, sensor networks, geospatial baselines, and classification tiers.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-6">
        <ol className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Sabah
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-semibold">Sources &amp; Methodology</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="pb-10 border-b border-[#E5E0D8]">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
          <p>Transparency &amp; Provenance</p>
          <p>Open Data Standards</p>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-950 leading-[1.1] mb-6">
          How to read our numbers.
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed">
          State of Sabah is an independent public-data project. Every figure, map boundary, and environmental reading is traceable to primary institutional documents, official statistical releases, or operational sensor feeds.
        </p>
      </header>

      {/* Provenance Tiers */}
      <section className="py-12 border-b border-[#E5E0D8] space-y-8">
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">1. Data Provenance Tiers</h2>
        <p className="text-stone-600 leading-relaxed">
          Every tile and metric card on the platform carries a strict classification badge indicating how recently and through what channel the figure was captured.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-white border border-[#E5E0D8] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-semibold text-emerald-800">Live</span>
              <StatusBadge status="Live" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Read directly from operational meteorological, hydrological, or satellite telemetry feeds within the last few hours.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E5E0D8] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-semibold text-stone-900">Official Latest</span>
              <StatusBadge status="Official latest" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              The most recent official release from DOSM, MPOB, or Sabah state agencies. Real and verified, published on their scheduled reporting cycles.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E5E0D8] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-semibold text-indigo-800">Documented</span>
              <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider border rounded bg-indigo-50 text-indigo-800 border-indigo-200">
                Static
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              A static spatial, topographical, or ecological figure extracted from peer-reviewed academic literature or gazetted forestry enactments.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E5E0D8] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-semibold text-amber-800">Forecast</span>
              <StatusBadge status="Forecast" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Seasonal meteorological or economic projections (such as El Niño precipitation anomalies) accompanied by explicit confidence intervals.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Institutional Sources */}
      <section className="py-12 border-b border-[#E5E0D8] space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">2. Primary Institutional Sources</h2>
        <p className="text-stone-600 leading-relaxed">
          Our core baseline datasets are anchored across several official repositories:
        </p>

        <ul className="space-y-4 text-sm">
          <li className="p-4 bg-[#F3F0EA] border border-[#E5E0D8] rounded">
            <strong className="text-stone-950 font-medium">OpenDOSM (Department of Statistics Malaysia):</strong> Population projections across Sabah&apos;s 27 districts, Consumer Price Index (CPI), Gross Domestic Product (GDP) by State, and Household Income Surveys (HIS).
          </li>
          <li className="p-4 bg-[#F3F0EA] border border-[#E5E0D8] rounded">
            <strong className="text-stone-950 font-medium">MetMalaysia (Malaysian Meteorological Department):</strong> Reference station temperature normals, rainfall anomalies, and regional ENSO seasonal outlooks.
          </li>
          <li className="p-4 bg-[#F3F0EA] border border-[#E5E0D8] rounded">
            <strong className="text-stone-950 font-medium">MPOB (Malaysian Palm Oil Board):</strong> Monthly crude palm oil (CPO) production volumes, mill throughput statistics, and regional state share metrics.
          </li>
          <li className="p-4 bg-[#F3F0EA] border border-[#E5E0D8] rounded">
            <strong className="text-stone-950 font-medium">Sabah Forestry Department &amp; DID:</strong> Totally Protected Areas (TPA) inventories, forest reserve classifications (Class I to VII), and river basin catchment boundaries.
          </li>
        </ul>
      </section>

      {/* Geospatial Methodology */}
      <section className="py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">3. Geospatial &amp; Cartographic Standards</h2>
        <p className="text-stone-600 leading-relaxed">
          District boundary vector data is rendered via client-side D3 projections (`d3-geo` / `geoMercator`) fitted to standardized GeoJSON topologies. Topographical calculations and elevation gradients follow standardized geographic survey data across Sabah&apos;s five administrative divisions.
        </p>
      </section>

      {/* Footer link */}
      <footer className="pt-8 border-t border-[#E5E0D8]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 hover:underline"
        >
          <span aria-hidden="true">←</span> Return to Sabah live dashboard
        </Link>
      </footer>
    </div>
  );
}