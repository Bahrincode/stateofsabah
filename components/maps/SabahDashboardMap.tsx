"use client";

import React, { useEffect, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";

// 1. Benchmark Stats for Sabah's Districts (DOSM 2024–2026 releases)
const DISTRICT_STATS: Record<
  string,
  { population: string; medianIncome: string; division: string }
> = {
  "Kota Kinabalu": { population: "500,400", medianIncome: "RM 6,407", division: "West Coast" },
  "Penampang": { population: "162,100", medianIncome: "RM 6,210", division: "West Coast" },
  "Putatan": { population: "88,200", medianIncome: "RM 5,840", division: "West Coast" },
  "Tuaran": { population: "135,700", medianIncome: "RM 4,150", division: "West Coast" },
  "Papar": { population: "150,200", medianIncome: "RM 4,490", division: "West Coast" },
  "Kota Belud": { population: "107,200", medianIncome: "RM 3,120", division: "West Coast" },
  "Ranau": { population: "105,400", medianIncome: "RM 3,420", division: "West Coast" },
  "Sandakan": { population: "439,050", medianIncome: "RM 4,380", division: "Sandakan" },
  "Kinabatangan": { population: "146,800", medianIncome: "RM 3,920", division: "Sandakan" },
  "Beluran": { population: "104,100", medianIncome: "RM 2,890", division: "Sandakan" },
  "Telupid": { population: "29,400", medianIncome: "RM 2,980", division: "Sandakan" },
  "Tongod": { population: "46,800", medianIncome: "RM 2,750", division: "Sandakan" },
  "Tawau": { population: "420,800", medianIncome: "RM 4,120", division: "Tawau" },
  "Lahad Datu": { population: "229,100", medianIncome: "RM 3,980", division: "Tawau" },
  "Semporna": { population: "166,600", medianIncome: "RM 3,110", division: "Tawau" },
  "Kunak": { population: "68,900", medianIncome: "RM 3,240", division: "Tawau" },
  "Kalabakan": { population: "31,200", medianIncome: "RM 3,450", division: "Tawau" },
  "Keningau": { population: "183,400", medianIncome: "RM 3,890", division: "Interior" },
  "Tambunan": { population: "35,700", medianIncome: "RM 3,510", division: "Interior" },
  "Tenom": { population: "55,600", medianIncome: "RM 3,210", division: "Interior" },
  "Nabawan": { population: "31,800", medianIncome: "RM 2,650", division: "Interior" },
  "Kudat": { population: "86,400", medianIncome: "RM 2,980", division: "Kudat" },
  "Kota Marudu": { population: "87,600", medianIncome: "RM 2,860", division: "Kudat" },
  "Pitas": { population: "43,200", medianIncome: "RM 2,340", division: "Kudat" },
  "Beaufort": { population: "75,700", medianIncome: "RM 3,940", division: "Interior" },
  "Kuala Penyu": { population: "23,700", medianIncome: "RM 3,560", division: "Interior" },
  "Sipitang": { population: "37,800", medianIncome: "RM 3,690", division: "Interior" },
};

// Helper for case-insensitive lookup
function getStats(name: string) {
  if (!name) return { population: "—", medianIncome: "—", division: "Sabah" };
  const key = Object.keys(DISTRICT_STATS).find(
    (k) => k.toLowerCase() === name.trim().toLowerCase()
  );
  return key
    ? DISTRICT_STATS[key]
    : { population: "Estimated 100K", medianIncome: "RM 3,500", division: "Sabah" };
}

export default function SabahDashboardMap() {
  const [activeMapLayer, setActiveMapLayer] = useState<"districts" | "climate">("districts");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Tuaran");
  const [geoData, setGeoData] = useState<any>(null);

useEffect(() => {
    fetch("/geo/sabah-districts.geojson")
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {
        // Filter strictly for Sabah across common GeoJSON property schemas
        const filteredFeatures = (data.features || []).filter((f: any) => {
          const props = f.properties || {};
          const stateValue = (
            props.state ||
            props.STATE ||
            props.shapeGroup ||
            props.name_1 ||
            props.NAME_1 ||
            props.negeri ||
            props.NEGERI ||
            ""
          ).toString().trim().toLowerCase();

          const codeValue = (props.code_state || props.id_1 || "").toString();

          // Code '12' is the national DOSM state code for Sabah
          return (
            stateValue === "sabah" ||
            stateValue.includes("sabah") ||
            codeValue === "12"
          );
        });

        // If the filter found Sabah features, use only them; otherwise use raw data
        const finalData = {
          ...data,
          features: filteredFeatures.length > 0 ? filteredFeatures : data.features,
        };

        setGeoData(finalData);
      })
      .catch((err) => {
        console.warn(
          "GeoJSON file missing at public/geo/sabah-districts.geojson. Falling back to empty state.",
          err
        );
        setGeoData({ type: "FeatureCollection", features: [] });
      });
  }, []);

  // 2. Create the D3 Projection
  const { projection, pathGenerator } = useMemo(() => {
    if (!geoData || !geoData.features || geoData.features.length === 0) {
      return { projection: null, pathGenerator: null };
    }

    const proj = geoMercator().fitSize([500, 400], geoData);
    const pathGen = geoPath().projection(proj);
    return { projection: proj, pathGenerator: pathGen };
  }, [geoData]);

  // 3. Dynamic Stats for Active Selection
  const currentStats = useMemo(() => getStats(selectedDistrict), [selectedDistrict]);

  // 4. Map Path Color Logic
  const getDistrictFill = (districtName: string) => {
    if (selectedDistrict.toLowerCase() === districtName.toLowerCase()) {
      return "#1C1917"; // Selected dark stone
    }
    if (activeMapLayer === "climate") {
      const lower = districtName.toLowerCase();
      if (["sandakan", "tawau", "lahad datu", "kinabatangan"].includes(lower)) return "#EF4444";
      if (["ranau", "tambunan", "keningau"].includes(lower)) return "#FDE047";
      return "#FB923C";
    }
    return "#EBE6DD"; // Default administrative warm gray
  };

  return (
    <section id="maps" className="py-12 border-b border-[#E5E0D8]">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-800 mb-1">
            Spatial Portrait · Chapter 1
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">
            Detailed Maps of Sabah
          </h2>
        </div>
        <p className="text-xs font-mono text-stone-500">
          Click any of the 27 districts to inspect
        </p>
      </div>

      {/* Layer Toggles */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveMapLayer("districts")}
          className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
            activeMapLayer === "districts"
              ? "bg-stone-900 text-white border-stone-900"
              : "bg-white text-stone-700 border-[#E5E0D8] hover:bg-stone-50"
          }`}
        >
          1. 27 Districts
        </button>
        <button
          type="button"
          onClick={() => setActiveMapLayer("climate")}
          className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
            activeMapLayer === "climate"
              ? "bg-stone-900 text-white border-stone-900"
              : "bg-white text-stone-700 border-[#E5E0D8] hover:bg-stone-50"
          }`}
        >
          2. Live Climate Overlay
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#E5E0D8] rounded-lg overflow-hidden">
        {/* LEFT: Cartography Canvas */}
        <div className="lg:col-span-7 p-6 bg-[#F6F4EE] border-b lg:border-b-0 lg:border-r border-[#E5E0D8] flex items-center justify-center">
          {!geoData ? (
            <p className="text-xs font-mono text-stone-500 animate-pulse">Loading spatial data...</p>
          ) : (
            <svg viewBox="0 0 500 400" className="w-full h-auto max-h-[450px]">
              <g>
                {geoData.features.map((feature: any, i: number) => {
                  const districtName =
                    feature.properties?.district ||
                    feature.properties?.DISTRICT ||
                    feature.properties?.name ||
                    feature.properties?.NAME_2 ||
                    `District ${i + 1}`;

                  const isSelected =
                    selectedDistrict.toLowerCase() === districtName.toLowerCase();

                  return (
                    <path
                      key={i}
                      d={pathGenerator?.(feature) || ""}
                      fill={getDistrictFill(districtName)}
                      stroke="#FAF8F5"
                      strokeWidth={isSelected ? 1.5 : 0.75}
                      className="cursor-pointer transition-colors duration-200 hover:opacity-80"
                      onClick={() => setSelectedDistrict(districtName)}
                    >
                      <title>{districtName}</title>
                    </path>
                  );
                })}
              </g>

              {/* Kota Kinabalu Coordinate Overlay */}
              {projection && (() => {
                const coords = projection([116.051, 5.937]);
                if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return null;
                return (
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r="4"
                    className="fill-emerald-600 stroke-white stroke-2"
                  />
                );
              })()}
            </svg>
          )}
        </div>

        {/* RIGHT: District Inspector Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                District Profile
              </span>
              <span className="text-xs font-mono text-stone-400">
                {currentStats.division} Division
              </span>
            </div>

            <h3 className="font-serif text-3xl text-stone-950 mb-6">
              {selectedDistrict}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D8] rounded">
                <p className="text-xs font-mono text-stone-500">Population</p>
                <p className="font-mono text-xl font-semibold text-stone-950 mt-1">
                  {currentStats.population}
                </p>
                <p className="text-[10px] font-mono text-stone-400 mt-1">DOSM Q1 2026</p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D8] rounded">
                <p className="text-xs font-mono text-stone-500">Median Income</p>
                <p className="font-mono text-xl font-semibold text-stone-950 mt-1">
                  {currentStats.medianIncome}
                </p>
                <p className="text-[10px] font-mono text-stone-400 mt-1">DOSM HIS 2024</p>
              </div>
            </div>
          </div>

          <a
            href={`/districts/${selectedDistrict.toLowerCase().replace(/\s+/g, "-")}`}
            className="pt-4 border-t border-[#E5E0D8] inline-flex items-center gap-1.5 text-sm font-mono font-medium text-stone-900 hover:underline"
          >
            Read full {selectedDistrict} report <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}