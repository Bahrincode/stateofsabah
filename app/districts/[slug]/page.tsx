// app/districts/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Sparkline } from "@/components/ui/Sparkline";

export interface DistrictDetail {
  name: string;
  division: "West Coast" | "Sandakan" | "Tawau" | "Interior" | "Kudat";
  population: string;
  medianIncome: string;
  povertyRate: string;
  tempAnomaly: string;
  rainfallPct: string;
  elevation: string;
  keyDriver: string;
  schools: string;
  hospitals: string;
  description: string;
  sparkline: string;
}

// Complete registry for all 27 administrative districts of Sabah
export const SABAH_DISTRICTS_DATA: Record<string, DistrictDetail> = {
  // --- WEST COAST DIVISION (7 Districts) ---
  "kota-kinabalu": {
    name: "Kota Kinabalu",
    division: "West Coast",
    population: "500,400",
    medianIncome: "RM 6,407",
    povertyRate: "2.1%",
    tempAnomaly: "+1.1°C",
    rainfallPct: "104%",
    elevation: "0m – 100m",
    keyDriver: "State Administration, Port Logistics & International Tourism",
    schools: "82 primary · 28 secondary · 4 tertiary campuses",
    hospitals: "Queen Elizabeth Hospital I & II · Likas Women & Children · 14 clinics",
    description: "The capital and financial engine of Sabah. Situated between the South China Sea and the foothills of the Crocker Range, KK hosts the state administrative centre, Sepanggar Bay Container Port, and Kota Kinabalu International Airport (BKI).",
    sparkline: "0,18 24,16 48,12 72,14 96,11 120,8",
  },
  penampang: {
    name: "Penampang",
    division: "West Coast",
    population: "162,100",
    medianIncome: "RM 6,210",
    povertyRate: "1.9%",
    tempAnomaly: "+1.0°C",
    rainfallPct: "112%",
    elevation: "10m – 350m",
    keyDriver: "Urban Commerce, Light Industrial & Kadazandusun Cultural Heritage",
    schools: "34 primary · 11 secondary",
    hospitals: "Penampang Polyclinic · Buhavan Square Specialist · 6 community clinics",
    description: "The historic heartland of the Kadazandusun people. Penampang functions as a bustling suburban extension of the greater Kota Kinabalu conurbation, balancing rapid commercial and residential growth with cultural landmarks like Monsopiad and KDCA.",
    sparkline: "0,14 24,15 48,13 72,11 96,10 120,7",
  },
  putatan: {
    name: "Putatan",
    division: "West Coast",
    population: "88,200",
    medianIncome: "RM 5,840",
    povertyRate: "2.4%",
    tempAnomaly: "+1.1°C",
    rainfallPct: "108%",
    elevation: "0m – 50m",
    keyDriver: "Suburban Transit, Coastal Fishing & Retail Logistics",
    schools: "16 primary · 5 secondary",
    hospitals: "Putatan Health Clinic · 5 rural & community clinics",
    description: "Sabah's most densely populated coastal district. Positioned directly south of Kota Kinabalu along the primary rail and road artery, Putatan is a vital transit corridor connecting the state capital to Beaufort and Brunei Bay.",
    sparkline: "0,16 24,14 48,15 72,12 96,10 120,9",
  },
  tuaran: {
    name: "Tuaran",
    division: "West Coast",
    population: "135,700",
    medianIncome: "RM 4,150",
    povertyRate: "4.8%",
    tempAnomaly: "+0.9°C",
    rainfallPct: "115%",
    elevation: "0m – 450m",
    keyDriver: "Agricultural Research, Coastal Eco-Resorts & Highland Gateways",
    schools: "76 primary · 14 secondary",
    hospitals: "Tuaran District Hospital · 16 community & rural clinics",
    description: "Spanning from Mengkabong estuary to the lower slopes of Mount Kinabalu at Tamparuli and Nabalu. Tuaran is celebrated for its historic tamu markets, agricultural research stations, and major luxury coastal resort strips.",
    sparkline: "0,20 24,18 48,15 72,13 96,12 120,10",
  },
  papar: {
    name: "Papar",
    division: "West Coast",
    population: "150,200",
    medianIncome: "RM 4,490",
    povertyRate: "4.2%",
    tempAnomaly: "+0.8°C",
    rainfallPct: "109%",
    elevation: "0m – 250m",
    keyDriver: "Rice Cultivation, Tropical Horticulture & Coastal Transit",
    schools: "62 primary · 13 secondary",
    hospitals: "Papar District Hospital · 14 rural health clinics",
    description: "Traditionally recognized as the food bowl of the West Coast. Papar stretches along the Kimanis coastline and the Papar River basin, acting as a crucial industrial link hosting the Kimanis Petroleum Training Centre and Gas Terminal.",
    sparkline: "0,17 24,16 48,14 72,15 96,11 120,9",
  },
  "kota-belud": {
    name: "Kota Belud",
    division: "West Coast",
    population: "107,200",
    medianIncome: "RM 3,120",
    povertyRate: "9.4%",
    tempAnomaly: "+0.7°C",
    rainfallPct: "122%",
    elevation: "0m – 550m",
    keyDriver: "Paddy Production, Livestock Grazing & Community-Based Ecotourism",
    schools: "68 primary · 12 secondary",
    hospitals: "Kota Belud Hospital · 15 rural clinics",
    description: "Home of the Bajau horsemen and extensive alluvial paddy plains. Nestled directly beneath the northern face of Mount Kinabalu, Kota Belud is a strategic agrarian district known for its river basins and heritage tamu markets.",
    sparkline: "0,24 24,22 48,19 72,17 96,16 120,14",
  },
  ranau: {
    name: "Ranau",
    division: "West Coast",
    population: "105,400",
    medianIncome: "RM 3,420",
    povertyRate: "8.2%",
    tempAnomaly: "+0.2°C",
    rainfallPct: "85%",
    elevation: "500m – 4,095m",
    keyDriver: "Highland Temperate Horticulture & World Heritage Ecotourism",
    schools: "72 primary · 11 secondary",
    hospitals: "Ranau District Hospital · 12 rural clinics",
    description: "A highland district nestled in the Crocker Range and home to Kinabalu UNESCO Global Geopark. Kundasang within Ranau supplies the majority of Sabah's fresh temperate vegetables, tea, and poultry products.",
    sparkline: "0,15 24,14 48,16 72,12 96,10 120,8",
  },

  // --- SANDAKAN DIVISION (5 Districts) ---
  sandakan: {
    name: "Sandakan",
    division: "Sandakan",
    population: "439,050",
    medianIncome: "RM 4,380",
    povertyRate: "5.1%",
    tempAnomaly: "+1.6°C",
    rainfallPct: "88%",
    elevation: "0m – 150m",
    keyDriver: "Palm Oil Refining (POIC), Deep Sea Fisheries & Gateway Eco-Tourism",
    schools: "98 primary · 24 secondary",
    hospitals: "Duchess of Kent Hospital · 18 rural clinics",
    description: "Historically known as Elopura and the colonial capital of North Borneo. Sandakan is Sabah's second-largest urban center, anchoring global palm oil export terminals and world-renowned wildlife sanctuaries at Sepilok.",
    sparkline: "0,8 24,12 48,14 72,13 96,16 120,18",
  },
  kinabatangan: {
    name: "Kinabatangan",
    division: "Sandakan",
    population: "146,800",
    medianIncome: "RM 3,920",
    povertyRate: "7.8%",
    tempAnomaly: "+1.3°C",
    rainfallPct: "92%",
    elevation: "10m – 300m",
    keyDriver: "Oil Palm Plantations & Wildlife Conservation Corridors",
    schools: "42 primary · 6 secondary",
    hospitals: "Kinabatangan Hospital (Bukit Garam) · 14 rural clinics",
    description: "Centered on Sabah's longest river (560 km), Kinabatangan is an economic powerhouse for crude palm oil output, alongside one of the world's most biodiverse riparian rainforest ecosystems in Sukau and Bilit.",
    sparkline: "0,19 24,18 48,15 72,14 96,13 120,11",
  },
  beluran: {
    name: "Beluran",
    division: "Sandakan",
    population: "104,100",
    medianIncome: "RM 2,890",
    povertyRate: "11.6%",
    tempAnomaly: "+1.4°C",
    rainfallPct: "89%",
    elevation: "0m – 200m",
    keyDriver: "Oil Palm Estates, Smallholder Agriculture & Marine Fisheries",
    schools: "54 primary · 8 secondary",
    hospitals: "Beluran District Hospital · 15 rural clinics",
    description: "Flanking Labuk Bay on the northeastern coast. Beluran is predominantly rural, characterized by large-scale oil palm estates, coastal mangrove estuaries, and scattered indigenous Tidong and Kadazandusun settlements.",
    sparkline: "0,25 24,24 48,20 72,19 96,17 120,15",
  },
  telupid: {
    name: "Telupid",
    division: "Sandakan",
    population: "29,400",
    medianIncome: "RM 2,980",
    povertyRate: "10.2%",
    tempAnomaly: "+0.9°C",
    rainfallPct: "96%",
    elevation: "80m – 450m",
    keyDriver: "Smallholder Agriculture, Rubber Tapping & Trans-Sabah Transit",
    schools: "22 primary · 3 secondary",
    hospitals: "Telupid Health Clinic · 6 rural clinics",
    description: "An interior gateway district established along the central highway connecting Kota Kinabalu to Sandakan. Telupid is surrounded by the Tawai Forest Reserve and smallholder agricultural lands.",
    sparkline: "0,22 24,20 48,18 72,16 96,15 120,13",
  },
  tongod: {
    name: "Tongod",
    division: "Sandakan",
    population: "46,800",
    medianIncome: "RM 2,750",
    povertyRate: "14.8%",
    tempAnomaly: "+0.8°C",
    rainfallPct: "102%",
    elevation: "100m – 800m",
    keyDriver: "Forestry Stewardship, Upstream Agro-Commodities & Biomass",
    schools: "31 primary · 4 secondary",
    hospitals: "Tongod Health Clinic · 11 rural health flying doctor outposts",
    description: "The geographical heart of Sabah and the largest district by land area (10,051 km²). Tongod features dense forest reserves, primary catchments, and emerging sustainable agro-forestry projects.",
    sparkline: "0,28 24,26 48,24 72,22 96,20 120,18",
  },

  // --- TAWAU DIVISION (5 Districts) ---
  tawau: {
    name: "Tawau",
    division: "Tawau",
    population: "420,800",
    medianIncome: "RM 4,120",
    povertyRate: "5.6%",
    tempAnomaly: "+1.4°C",
    rainfallPct: "78%",
    elevation: "0m – 200m",
    keyDriver: "Cross-Border Trade, Cocoa/Palm Commodities & Marine Logistics",
    schools: "88 primary · 21 secondary",
    hospitals: "Tawau General Hospital · 16 community & rural clinics",
    description: "Sabah's southeastern trade capital. Situated across Cowie Harbour and directly adjoining Indonesia's North Kalimantan border, Tawau is a major port for oil palm products, cocoa processing, and regional maritime barter trade.",
    sparkline: "0,12 24,14 48,15 72,13 96,15 120,14",
  },
  "lahad-datu": {
    name: "Lahad Datu",
    division: "Tawau",
    population: "229,100",
    medianIncome: "RM 3,980",
    povertyRate: "6.8%",
    tempAnomaly: "+1.3°C",
    rainfallPct: "82%",
    elevation: "0m – 350m",
    keyDriver: "Palm Oil Industrial Cluster (POIC), Deep Sea Port & Conservation",
    schools: "58 primary · 12 secondary",
    hospitals: "Lahad Datu District Hospital · 14 rural clinics",
    description: "Overlooking Darvel Bay, Lahad Datu is home to the specialized Palm Oil Industrial Cluster (POIC) port. It serves as the primary scientific gateway to Danum Valley Conservation Area and Tabin Wildlife Reserve.",
    sparkline: "0,16 24,15 48,14 72,13 96,12 120,11",
  },
  semporna: {
    name: "Semporna",
    division: "Tawau",
    population: "166,600",
    medianIncome: "RM 3,110",
    povertyRate: "11.2%",
    tempAnomaly: "+1.5°C",
    rainfallPct: "80%",
    elevation: "0m – 100m",
    keyDriver: "Global Marine Tourism (Sipadan), Seaweed Farming & Aquaculture",
    schools: "48 primary · 9 secondary",
    hospitals: "Semporna District Hospital · 11 rural health centers",
    description: "Famed globally as the gateway to the world-class dive sites of Sipadan and Mabul. Semporna has a proud Bajau Laut seafaring tradition, high marine biodiversity, and Malaysia's leading commercial seaweed industry.",
    sparkline: "0,21 24,20 48,18 72,19 96,16 120,15",
  },
  kunak: {
    name: "Kunak",
    division: "Tawau",
    population: "68,900",
    medianIncome: "RM 3,240",
    povertyRate: "8.7%",
    tempAnomaly: "+1.2°C",
    rainfallPct: "84%",
    elevation: "0m – 250m",
    keyDriver: "Oil Palm Cultivation, Aquaculture & Coastal Fisheries",
    schools: "20 primary · 4 secondary",
    hospitals: "Kunak District Hospital · 7 rural clinics",
    description: "Located on the Darvel Bay coastline between Lahad Datu and Semporna. Kunak's fertile volcanic soils host large-scale commercial palm estates, alongside bird's nest cave systems at Madai.",
    sparkline: "0,20 24,18 48,17 72,15 96,14 120,12",
  },
  kalabakan: {
    name: "Kalabakan",
    division: "Tawau",
    population: "31,200",
    medianIncome: "RM 3,450",
    povertyRate: "7.9%",
    tempAnomaly: "+1.1°C",
    rainfallPct: "81%",
    elevation: "20m – 450m",
    keyDriver: "Plantation Agribusiness, Forest Plantations & Border Logistics",
    schools: "15 primary · 3 secondary",
    hospitals: "Kalabakan Health Clinic · 6 rural clinics",
    description: "Gazetted as an independent administrative district from Tawau, Kalabakan borders North Kalimantan. It sits along the frontier of trans-Borneo connectivity and houses expansive commercial industrial timber zones.",
    sparkline: "0,18 24,17 48,16 72,14 96,13 120,11",
  },

  // --- INTERIOR DIVISION (7 Districts) ---
  keningau: {
    name: "Keningau",
    division: "Interior",
    population: "183,400",
    medianIncome: "RM 3,890",
    povertyRate: "7.4%",
    tempAnomaly: "+0.8°C",
    rainfallPct: "98%",
    elevation: "250m – 700m",
    keyDriver: "Interior Commercial Hub, Agro-Processing & Timber Industries",
    schools: "84 primary · 15 secondary · Vocational College",
    hospitals: "Keningau Regional Hospital · 18 rural health clinics",
    description: "The primary administrative and commercial capital of Sabah's interior valley. Sitting in the rain shadow of the Crocker Range, Keningau is famous for the historic Oath Stone (Batu Sumpah) and agricultural processing.",
    sparkline: "0,16 24,14 48,15 72,12 96,11 120,9",
  },
  tambunan: {
    name: "Tambunan",
    division: "Interior",
    population: "35,700",
    medianIncome: "RM 3,510",
    povertyRate: "6.9%",
    tempAnomaly: "+0.3°C",
    rainfallPct: "105%",
    elevation: "550m – 1,200m",
    keyDriver: "Terraced Paddy Cultivation, Bamboo Forests & Cultural Agritourism",
    schools: "32 primary · 5 secondary",
    hospitals: "Tambunan District Hospital · 9 rural health clinics",
    description: "Often called the Switzerland of the East due to its terraced valley rice fields framed by the Crocker Range and Mount Trusmadi. Tambunan is a cool-climate cultural stronghold of the Dusun ethnic community.",
    sparkline: "0,15 24,13 48,14 72,11 96,10 120,8",
  },
  tenom: {
    name: "Tenom",
    division: "Interior",
    population: "55,600",
    medianIncome: "RM 3,210",
    povertyRate: "9.1%",
    tempAnomaly: "+0.9°C",
    rainfallPct: "95%",
    elevation: "200m – 600m",
    keyDriver: "Coffee Cultivation, Tropical Horticulture & Hydroelectric Energy",
    schools: "44 primary · 8 secondary",
    hospitals: "Tenom District Hospital · 12 rural clinics",
    description: "Located at the southern terminus of the heritage North Borneo Railway. Tenom sits within the fertile Padas River gorge, world-famous for its traditional roast coffee (Yit Foh/Fatt Choi) and the Sabah Agriculture Park.",
    sparkline: "0,21 24,19 48,17 72,16 96,14 120,12",
  },
  nabawan: {
    name: "Nabawan",
    division: "Interior",
    population: "31,800",
    medianIncome: "RM 2,650",
    povertyRate: "16.4%",
    tempAnomaly: "+0.6°C",
    rainfallPct: "108%",
    elevation: "250m – 900m",
    keyDriver: "Subsistence Farming, Forest Foraging & Rural Craftwork",
    schools: "28 primary · 3 secondary",
    hospitals: "Nabawan Health Clinic · 10 rural health posts",
    description: "Encompassing the expansive southern Murut homelands extending toward the Kalimantan boundary. Nabawan's deep interior topography poses logistical challenges, resulting in distinct living costs and price premiums.",
    sparkline: "0,30 24,28 48,25 72,23 96,21 120,19",
  },
  beaufort: {
    name: "Beaufort",
    division: "Interior",
    population: "75,700",
    medianIncome: "RM 3,940",
    povertyRate: "5.8%",
    tempAnomaly: "+0.9°C",
    rainfallPct: "114%",
    elevation: "0m – 100m",
    keyDriver: "Sago Cultivation, Commercial Oil Palm & Eco-River Tourism",
    schools: "49 primary · 9 secondary",
    hospitals: "Beaufort Hospital · 14 rural clinics",
    description: "Located on the floodplains of the Padas River. Beaufort is an agricultural and railway transit center famous for its sago processing, local produce, and proboscis monkey river cruises along the Klias Peninsula.",
    sparkline: "0,17 24,15 48,14 72,13 96,11 120,9",
  },
  "kuala-penyu": {
    name: "Kuala Penyu",
    division: "Interior",
    population: "23,700",
    medianIncome: "RM 3,560",
    povertyRate: "6.5%",
    tempAnomaly: "+0.9°C",
    rainfallPct: "110%",
    elevation: "0m – 80m",
    keyDriver: "Mud Volcano Tourism, Coastal Fisheries & Coconut Farming",
    schools: "22 primary · 4 secondary",
    hospitals: "Kuala Penyu Hospital · 7 rural clinics",
    description: "Occupying the tip of the Klias Peninsula facing the South China Sea. Kuala Penyu is recognized for its pristine beaches, mangrove ecosystems, and the bubbling geological mineral mud volcanoes at Pulau Tiga.",
    sparkline: "0,16 24,14 48,13 72,12 96,11 120,9",
  },
  sipitang: {
    name: "Sipitang",
    division: "Interior",
    population: "37,800",
    medianIncome: "RM 3,690",
    povertyRate: "7.1%",
    tempAnomaly: "+0.8°C",
    rainfallPct: "116%",
    elevation: "0m – 300m",
    keyDriver: "SOGIP Petrochemical Hub, Pulp/Paper Processing & Cross-Border Logistics",
    schools: "27 primary · 5 secondary",
    hospitals: "Sipitang District Hospital · 9 rural clinics",
    description: "Sabah's border gateway to Sarawak and Brunei. Sipitang is rapidly developing into an industrial heavyweight through the Sipitang Oil & Gas Industrial Park (SOGIP) along the Pan-Borneo transport corridor.",
    sparkline: "0,19 24,17 48,16 72,14 96,12 120,10",
  },

  // --- KUDAT DIVISION (3 Districts) ---
  kudat: {
    name: "Kudat",
    division: "Kudat",
    population: "86,400",
    medianIncome: "RM 2,980",
    povertyRate: "12.4%",
    tempAnomaly: "+1.3°C",
    rainfallPct: "86%",
    elevation: "0m – 120m",
    keyDriver: "Maritime Fisheries, Coconut Plantations & Tip of Borneo Tourism",
    schools: "56 primary · 9 secondary",
    hospitals: "Kudat District Hospital · 14 rural clinics",
    description: "The historic northern tip of Borneo where the South China Sea meets the Sulu Sea at Tanjung Simpang Mengayau. Kudat is the ancestral heart of the Rungus community, renowned for boatbuilding, copra, and artisanal gong making.",
    sparkline: "0,25 24,23 48,20 72,18 96,17 120,15",
  },
  "kota-marudu": {
    name: "Kota Marudu",
    division: "Kudat",
    population: "87,600",
    medianIncome: "RM 2,860",
    povertyRate: "13.9%",
    tempAnomaly: "+1.1°C",
    rainfallPct: "94%",
    elevation: "10m – 450m",
    keyDriver: "Alluvial Paddy Farming, Oil Palm Smallholders & Hydro-Solar Systems",
    schools: "46 primary · 7 secondary",
    hospitals: "Kota Marudu District Hospital · 12 rural clinics",
    description: "Situated along Marudu Bay with extensive agricultural plains. Kota Marudu serves as the central commercial hub for northern Sabah, hosting agricultural smallholders and river catchment networks.",
    sparkline: "0,27 24,25 48,22 72,20 96,18 120,16",
  },
  pitas: {
    name: "Pitas",
    division: "Kudat",
    population: "43,200",
    medianIncome: "RM 2,340",
    povertyRate: "19.8%",
    tempAnomaly: "+1.2°C",
    rainfallPct: "90%",
    elevation: "0m – 250m",
    keyDriver: "Shrimp Aquaculture, Mangrove Fisheries & Subsistence Agriculture",
    schools: "32 primary · 4 secondary",
    hospitals: "Pitas District Hospital · 9 rural community clinics",
    description: "A rural coastal district along the eastern shores of Marudu Bay. Pitas features extensive mangrove estuarine fisheries and large-scale commercial black tiger prawn aquaculture farms.",
    sparkline: "0,32 24,30 48,27 72,25 96,24 120,22",
  },
};

export default async function DistrictProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = SABAH_DISTRICTS_DATA[slug.toLowerCase()];

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      {/* Breadcrumb Path */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-4">
        <ol className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Sabah
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/districts" className="hover:text-stone-900 transition-colors">
              Districts
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-900 font-semibold">{data.name}</li>
        </ol>
      </nav>

      {/* District Hero Header */}
      <header className="pt-6 pb-10 border-b border-[#E5E0D8]">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
          <p className="text-emerald-800 font-medium">{data.division} Division</p>
          <p>Administrative District Profile</p>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight text-stone-950 max-w-4xl leading-[1.05] mb-6">
          {data.name}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 max-w-3xl leading-relaxed">
          {data.description}
        </p>
      </header>

      {/* Local Conditions Grid */}
      <section aria-label="Local conditions" className="py-10 border-b border-[#E5E0D8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">Local conditions</h2>
            <p className="text-xs font-mono text-stone-500">Live environmental and topography data</p>
          </div>
          <StatusBadge status="Live" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#E5E0D8] gap-[1px] border border-[#E5E0D8] rounded-lg overflow-hidden">
          <div className="bg-white p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Temperature Anomaly
            </p>
            <p className="font-mono text-4xl font-semibold text-amber-700">
              {data.tempAnomaly}
            </p>
            <p className="text-xs text-stone-500 mt-2">vs 1991–2020 baseline</p>
          </div>

          <div className="bg-white p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Monthly Rainfall
            </p>
            <p className="font-mono text-4xl font-semibold text-blue-700">
              {data.rainfallPct}
            </p>
            <p className="text-xs text-stone-500 mt-2">of historical seasonal average</p>
          </div>

          <div className="bg-white p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Elevation Range
            </p>
            <p className="font-mono text-2xl font-semibold text-stone-950 mt-2">
              {data.elevation}
            </p>
            <p className="text-xs text-stone-500 mt-2">Topographic baseline</p>
          </div>
        </div>
      </section>

      {/* District Socio-Economic Indicators */}
      <section aria-label="The district in numbers" className="py-10 border-b border-[#E5E0D8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-950">The district in numbers</h2>
            <p className="text-xs font-mono text-stone-500">Official latest releases from DOSM &amp; State Agencies</p>
          </div>
          <StatusBadge status="Official latest" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#E5E0D8] gap-[1px] border border-[#E5E0D8] rounded-lg overflow-hidden mb-8">
          <div className="bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-stone-500 mb-2">People</p>
              <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                {data.population}
              </p>
              <p className="text-[11px] text-stone-500">DOSM Q1 2026 estimate</p>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-stone-500 mb-2">Median Income</p>
              <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                {data.medianIncome}
              </p>
              <p className="text-[11px] text-stone-500">DOSM Household Survey</p>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-stone-500 mb-2">Poverty Incidence</p>
              <p className="font-mono text-3xl font-semibold text-stone-950 mb-1">
                {data.povertyRate}
              </p>
              <Sparkline points={data.sparkline} color="#DC2626" />
              <p className="text-[11px] text-stone-500">e-Kasih / DOSM 2024</p>
            </div>
          </div>

          <div className="bg-white p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-stone-500 mb-2">Primary Economic Base</p>
              <p className="font-sans text-sm font-semibold text-stone-950 mt-1 leading-snug">
                {data.keyDriver}
              </p>
            </div>
          </div>
        </div>

        {/* Public Infrastructure Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-white p-6 border border-[#E5E0D8] rounded-lg">
            <h3 className="font-serif text-xl text-stone-950 mb-2">Education Facilities</h3>
            <p className="text-sm text-stone-600 mb-4">
              Registered primary, secondary, and tertiary public institutions.
            </p>
            <p className="text-xs font-mono text-stone-800 bg-[#F3F0EA] p-3.5 rounded border border-[#E5E0D8]">
              {data.schools}
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E5E0D8] rounded-lg">
            <h3 className="font-serif text-xl text-stone-950 mb-2">Healthcare Access</h3>
            <p className="text-sm text-stone-600 mb-4">
              District hospitals, maternal centers, and rural health clinics (Klinik Desa).
            </p>
            <p className="text-xs font-mono text-stone-800 bg-[#F3F0EA] p-3.5 rounded border border-[#E5E0D8]">
              {data.hospitals}
            </p>
          </div>
        </div>
      </section>

      {/* District Switcher Navigation */}
      <section aria-label="Explore other districts" className="pt-12">
        <h2 className="font-serif text-2xl text-stone-950 mb-4">Explore other districts</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SABAH_DISTRICTS_DATA).map(([key, item]) => (
            <Link
              key={key}
              href={`/districts/${key}`}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
                item.name === data.name
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-700 border-[#E5E0D8] hover:bg-stone-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}