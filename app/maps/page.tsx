// app/maps/page.tsx
import React from "react";
import { Metadata } from "next";
import SabahDashboardMap from "@/components/maps/SabahDashboardMap";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Spatial Portraits of Sabah — State of Sabah",
  description: "Interactive maps of Sabah's 27 districts, climate anomalies, and infrastructure.",
};

export default function MapsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] font-sans selection:bg-stone-800 selection:text-stone-100">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* Chapter Header */}
        <header className="pt-16 pb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-800 mb-4">
            The Library · Chapter One
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-stone-950 mb-6 max-w-4xl leading-[1.05]">
            Geography, rendered as stories of land and life.
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl leading-relaxed">
            Sabah’s landscape dictates its reality. From the temperate highland agriculture of the Crocker Range to the vast, flood-prone river basins of the East Coast. These spatial portraits overlay real-time telemetry onto the state's 27 administrative districts.
          </p>
        </header>

        {/* The Interactive Cartographic Engine */}
        {/* We reuse the Client Component map we built earlier, letting it handle D3/GeoJSON state */}
        <div className="mb-16">
          <SabahDashboardMap />
        </div>

        {/* Methodological Context for the Maps */}
        <section className="pt-12 border-t border-[#E5E0D8]">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">Spatial Methodology</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="bg-white p-6 border border-[#E5E0D8] rounded-lg">
              <p className="font-mono font-medium text-stone-900 mb-2">01. Administrative Boundaries</p>
              <p className="text-stone-600 leading-relaxed">
                The base layer utilises the official 2020 Census polygons provided by the Department of Statistics Malaysia (DOSM). It maps all 27 gazetted districts, accurate to the current delineations used for electoral and welfare distribution.
              </p>
            </div>
            
            <div className="bg-white p-6 border border-[#E5E0D8] rounded-lg">
              <p className="font-mono font-medium text-stone-900 mb-2">02. Live Telemetry Overlay</p>
              <p className="text-stone-600 leading-relaxed">
                Meteorological data is polled hourly from open MetMalaysia endpoints and Open-Meteo arrays. Interpolation between nodes (e.g., between the Kudat coastal station and the Kinabalu highland station) is computed dynamically to simulate spatial thermal gradients.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#E5E0D8] rounded-lg">
              <p className="font-mono font-medium text-stone-900 mb-2">03. Ecological & Infrastructure</p>
              <p className="text-stone-600 leading-relaxed">
                Totally Protected Areas (TPAs) and the Pan-Borneo Highway alignments are static vectors derived from the Sabah Forestry Department and the Public Works Department (JKR) public releases. They are updated quarterly.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}