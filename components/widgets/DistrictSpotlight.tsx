// components/widgets/DistrictSpotlight.tsx
"use client";

import React, { useState } from "react";
import { SABAH_DIVISIONS } from "@/lib/static-data";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function DistrictSpotlight() {
  const [spotlightId, setSpotlightId] = useState<string>("sandakan");
  const spotlightData = SABAH_DIVISIONS[spotlightId];

  return (
    <section id="spotlight" aria-label="District spotlight" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: District Spotlight (Interactive Switcher) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E0D8] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-2xl text-stone-950">Division &amp; District spotlight</h2>
                <p className="text-xs font-mono text-stone-500">Rotates daily · click to preview</p>
              </div>
              <div className="flex gap-1">
                {Object.keys(SABAH_DIVISIONS).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSpotlightId(key)}
                    className={`px-2 py-1 text-[10px] font-mono uppercase rounded border ${
                      spotlightId === key
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {key.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-serif text-3xl text-stone-900 mb-2">{spotlightData.division}</p>
            <p className="text-sm text-stone-600 leading-relaxed mb-5">
              {spotlightData.description}
            </p>

            <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-md mb-6 flex items-center justify-between">
              <p className="text-xs text-stone-700">
                Today across {spotlightData.division}:{" "}
                <span className="font-mono font-semibold text-amber-800">
                  {spotlightData.tempAnomaly}
                </span>{" "}
                against normal, rainfall at{" "}
                <span className="font-mono font-semibold">{spotlightData.rainfallPct}</span> of usual.
              </p>
              <StatusBadge status="Live" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#E5E0D8]">
              <div>
                <p className="text-xs font-mono text-stone-500">People</p>
                <p className="font-mono text-2xl font-semibold text-stone-950">
                  {spotlightData.population}
                </p>
                <p className="text-xs text-stone-500">{spotlightData.popShare}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-stone-500">Median income</p>
                <p className="font-mono text-2xl font-semibold text-stone-950">
                  {spotlightData.medianIncome}
                </p>
                <p className="text-xs text-stone-500">{spotlightData.incomeContext}</p>
              </div>
            </div>
          </div>

          <a
            href="#maps"
            className="mt-6 pt-4 border-t border-[#E5E0D8] inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 hover:underline"
          >
            Inspect {spotlightData.division} on the spatial map <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* RIGHT: Did You Know (Scientific Context Cards) */}
        <div className="lg:col-span-6 bg-[#F3F0EA] border border-[#E5E0D8] rounded-lg p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-5">
            Did you know · Sabah Earth &amp; Life Systems
          </p>

          <div className="space-y-6">
            <div className="pb-5 border-b border-[#E5E0D8]">
              <p className="font-serif text-lg text-stone-950 mb-1">
                Altitude drops temperature by 6.5°C for every kilometre climbed.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                Because air expands and cools as it rises up the Crocker Range, Kundasang sits roughly 9–10°C cooler than coastal Kota Kinabalu just 55 kilometres away.
              </p>
              <p className="text-[11px] font-mono text-stone-400">Environmental lapse rate</p>
            </div>

            <div>
              <p className="font-serif text-lg text-stone-950 mb-1">
                The Kinabatangan drains nearly a quarter of Sabah&apos;s land mass.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed mb-1.5">
                Spanning 560 kilometres from the interior mountains to the Sulu Sea, the Sungai Kinabatangan catchment covers 16,800 km².
              </p>
              <p className="text-[11px] font-mono text-stone-400">Sabah Department of Irrigation and Drainage (DID)</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}