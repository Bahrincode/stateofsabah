// app/stories/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";

export interface StorySection {
  sectionTitle?: string;
  paragraphs: string[];
  callout?: {
    label: string;
    value: string;
    detail: string;
  };
}

export interface StoryDetail {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  dek: string;
  content: StorySection[];
}

export const STORIES_DATA: Record<string, StoryDetail> = {
  "grocery-bill-geography": {
    slug: "grocery-bill-geography",
    category: "Cost of Living & Geography",
    readTime: "9 min read",
    date: "October 2026",
    author: "State of Sabah Research",
    title: "Why does a basket of groceries cost different in Nabawan than in Kota Kinabalu?",
    dek: "State inflation is a single average; a receipt at the tamu or retail store is geographical. Thirty years of the Sabah consumer price index—combined with Sepanggar port throughput and rural distribution miles—explain the gap.",
    content: [
      {
        sectionTitle: "The Illusion of the Statewide Consumer Price Index",
        paragraphs: [
          "Every month, the Department of Statistics Malaysia (DOSM) publishes the Consumer Price Index (CPI) for Sabah. Headline state inflation regularly tracks around +1.6% year-on-year. To macroeconomic policy planners, this signals stable purchasing power across the territory.",
          "However, step into a sundry shop in Nabawan, Pagalungan, or Tongod, and the receipt tells a completely different story. A standard 10-kilogram sack of imported fragrant rice, standard cooking oil, and canned proteins consistently carry a 15% to 28% markup over their retail equivalents in Inanam or Penampang.",
          "This divergence does not stem from merchant price-gouging; it is the physical friction of Borneo's topography expressed in Ringgit and Sen.",
        ],
        callout: {
          label: "Interior Price Premium",
          value: "+21.4%",
          detail: "Average grocery basket markup in rural Interior districts relative to the West Coast port radius.",
        },
      },
      {
        sectionTitle: "The Sepanggar Gateway and the Topography Surcharge",
        paragraphs: [
          "More than 80% of containerized retail consumer staples entering Sabah arrive at a single point: Sepanggar Bay Container Port north of Kota Kinabalu. Once offloaded, these goods face the physical barrier of the Crocker Range.",
          "To reach Keningau, Tenom, and Nabawan, heavy haulage lorries must conquer the Kimanis-Keningau or Tambunan passes—steep routes with sustained road gradients exceeding 12% rising over 1,400 metres above sea level.",
          "Climbing the range demands double the fuel consumption, accelerates brake and transmission wear, and precludes multi-trailer operations. Transporters routinely price in a 'topography tariff' of RM 0.45 to RM 0.85 per ton-kilometre simply to negotiate the mountain passes.",
        ],
      },
      {
        sectionTitle: "Sparse Freight Volumes and Fragile Last-Mile Spurs",
        paragraphs: [
          "Beyond Keningau, the road network to Nabawan degrades into dual carriageways vulnerable to monsoon landslides and riverine washouts.",
          "Unlike urban supermarkets in Kota Kinabalu that leverage continuous container-load drop-offs and high stock turnover, rural interior retailers rely on third-party consolidated lorries making one or two runs per week.",
          "Because consumer volume is dispersed across small settlements, rural shopkeepers bear substantial working capital risks and inventory holding costs. When a river bridge or culvert is washed out, delivery routes are disrupted, driving spot prices even higher.",
        ],
        callout: {
          label: "Haulage Surcharge",
          value: "RM 1.20 / kg",
          detail: "Estimated additional freight and logistical cost on basic dry goods delivered past Keningau.",
        },
      },
      {
        sectionTitle: "Infrastructure as Price Stabilization",
        paragraphs: [
          "Addressing regional inequality requires understanding that physical infrastructure—such as all-weather road paving, freight consolidation depots, and mountain grade improvements—functions as a direct cost-of-living mitigation tool.",
          "Until rural supply chains can bypass mountain bottlenecks and seasonal washouts, the true cost of feeding a family in Sabah will remain dictated by elevation and distance.",
        ],
      },
    ],
  },

  "pan-borneo-pulse": {
    slug: "pan-borneo-pulse",
    category: "Infrastructure",
    readTime: "8 min read",
    date: "September 2026",
    author: "State of Sabah Research",
    title: "Tracking the pulse of the Pan-Borneo Highway",
    dek: "How Phase 1A alignments are already shifting domestic supply chains between the West Coast and the Interior before the tarmac is even fully laid.",
    content: [
      {
        sectionTitle: "Rethinking Sabah's Arterial Spine",
        paragraphs: [
          "For half a century, the primary overland route connecting Sabah's capital to its agricultural and timber heartlands consisted of narrow, unlit two-lane roads cutting through unstable geological zones.",
          "The Pan-Borneo Highway project is fundamentally re-engineering this relationship. As Phase 1A packages near completion between Papar, Donggongon, and the interior junctions, travel times that once took four to five hours under heavy rain are being cut by nearly 40%.",
          "Freight haulers and agricultural logistics operators are already redesigning their scheduling and fleet deployment around the newly opened dual-carriageway corridors.",
        ],
        callout: {
          label: "Transit Time Reduction",
          value: "-38%",
          detail: "Average heavy vehicle turnaround time between West Coast container yards and Beaufort transit hubs.",
        },
      },
      {
        sectionTitle: "The Kimanis–Papar Economic Corridor",
        paragraphs: [
          "The upgrading of the coastal corridor has spurred rapid transformation along the Papar–Beaufort axis. Light industrial parks, cold-chain transshipment depots, and regional distribution centers are sprouting along the bypass alignments.",
          "This shift allows smallholder farmers in Tenom and Keningau to transport perishable highland vegetables and tropical fruits to Kota Kinabalu International Airport (BKI) for direct air export within 12 hours of harvest, significantly reducing post-harvest spoilage.",
        ],
      },
      {
        sectionTitle: "The Challenge of Unfinished Packages and Geology",
        paragraphs: [
          "Despite these successes, major bottlenecks persist where road packages traverse active slide zones and floodplains. Geotechnical stabilization along the Trusmadi and Crocker peripheries remains a high-cost engineering challenge.",
          "Constructing dual carriageways through tropical clay soils requires extensive sub-base soil replacement and geotextile reinforcement to prevent pavement rutting caused by overloaded 40-tonne timber and palm oil tankers.",
        ],
        callout: {
          label: "Pavement Durability",
          value: "40 Tonnes",
          detail: "Axle load ratings required for heavy palm oil and petroleum tanker transit corridors.",
        },
      },
      {
        sectionTitle: "Toward an Integrated Economic Corridor",
        paragraphs: [
          "The true impact of the Pan-Borneo Highway will not be measured solely in kilometres of asphalt, but in the economic integration of Sabah's 27 districts into a cohesive single market.",
          "As remaining packages connect the East Coast ports of Sandakan and Tawau with the West Coast, the historical economic divide between east and west Sabah will steadily narrow.",
        ],
      },
    ],
  },

  "canopy-cooling": {
    slug: "canopy-cooling",
    category: "Climate & Ecology",
    readTime: "7 min read",
    date: "August 2026",
    author: "State of Sabah Research",
    title: "The rainforest that recycles its own rain",
    dek: "Canopy evapotranspiration across Danum Valley pumps moisture back into the boundary layer, buffering local drought stress during El Niño events.",
    content: [
      {
        sectionTitle: "Borneo's Biotic Pump",
        paragraphs: [
          "Deep in the 438-square-kilometre Danum Valley Conservation Area, primary dipterocarp rainforest trees tower over 80 metres into the equatorial sky. These ancient forests do far more than store carbon; they actively regulate the regional climate.",
          "Through a process known as evapotranspiration, a single mature dipterocarp tree can pull hundreds of litres of groundwater per day and transpire it through its canopy leaves into the lower atmosphere.",
          "This biological vapor engine creates low-altitude cloud cover and localized afternoon convection storms, creating a closed-loop hydrological cycle where the forest effectively recycles its own precipitation.",
        ],
        callout: {
          label: "Atmospheric Moisture",
          value: "720 mm",
          detail: "Estimated annual precipitation generated purely through internal forest canopy recycling.",
        },
      },
      {
        sectionTitle: "A Thermal Shield Against El Niño",
        paragraphs: [
          "When severe El Niño Southern Oscillation (ENSO) conditions develop across the western Pacific, drought conditions grip much of Southeast Asia. Satellite ground sensors consistently record land surface temperatures in clear-felled and agricultural oil palm landscapes spiking up to 6°C above normal.",
          "Inside intact forest tracts like Danum Valley, Maliau Basin, and Imbak Canyon, dense multi-tiered canopies reflect incoming solar radiation and cool the ambient air through evaporative cooling.",
          "Microclimate temperature sensors under the Danum canopy record understory temperatures that remain 3°C to 5°C cooler than adjacent deforested monocultures, shielding moisture-sensitive seedlings and native wildlife from thermal shock.",
        ],
      },
      {
        sectionTitle: "Riparian Corridors and River Flow Stability",
        paragraphs: [
          "The hydrological influence of Danum Valley extends well beyond its conservation borders into the Segama and Kinabatangan river basins.",
          "By retaining moisture like a giant sponge, the forest floor absorbs intense tropical downpours and releases water gradually into catchment streams. This sponge effect mitigates downstream flash flooding during the Northeast Monsoon and sustains baseline river flows during seasonal dry spells.",
        ],
        callout: {
          label: "Thermal Buffer",
          value: "-4.8°C",
          detail: "Understory cooling effect observed beneath primary canopy compared to open ground during peak sunlight.",
        },
      },
      {
        sectionTitle: "Preserving the Living Climate Machine",
        paragraphs: [
          "The ecological data emerging from Danum Valley underscores a vital reality: protecting primary rainforest is not merely a conservation concern, but a critical climate adaptation strategy for Sabah's water and food security.",
          "Protecting intact forest corridors ensures that Borneo's biotic rain machine continues to recharge our water tables for generations to come.",
        ],
      },
    ],
  },
};

// Aliases for historical routing links
STORIES_DATA["grocery-cost-nabawan-vs-kk"] = STORIES_DATA["grocery-bill-geography"];

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

      {/* Header */}
      <header  />

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