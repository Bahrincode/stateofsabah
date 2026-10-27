// lib/stories-data.ts
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
        ],
        callout: {
          label: "Transit Time Reduction",
          value: "-38%",
          detail: "Average heavy vehicle turnaround time between West Coast container yards and Beaufort transit hubs.",
        },
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
        ],
        callout: {
          label: "Atmospheric Moisture",
          value: "720 mm",
          detail: "Estimated annual precipitation generated purely through internal forest canopy recycling.",
        },
      },
    ],
  },
};

STORIES_DATA["grocery-cost-nabawan-vs-kk"] = STORIES_DATA["grocery-bill-geography"];