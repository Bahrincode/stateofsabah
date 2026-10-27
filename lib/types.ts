// lib/types.ts

// ─── Data provenance ──────────────────────────────────────────────
export type DataStatus =
  | "Live"           // client-side fetch, refreshes per session
  | "Official latest"// latest statistical release (DOSM, MOH, etc.)
  | "Forecast"       // model output or projection
  | "Illustrative";  // placeholder pending real source; must carry TODO

// ─── A single measured value ─────────────────────────────────────
export interface DataPoint {
  value: number;
  unit: string;              // "people", "RM", "%", "°C", ":1"
  period: string;            // "2025", "2026-03", "2024"
  status: DataStatus;
  source: string;            // "DOSM Mid-Year Population Estimates 2025"
  sourceUrl?: string;
  note?: string;             // one-line "how to read this"
}

// ─── A metric over time ──────────────────────────────────────────
export interface TimeSeries {
  indicator: string;
  unit: string;
  status: DataStatus;
  source: string;
  sourceUrl?: string;
  points: Array<{ period: string; value: number }>;
}

// ─── A chapter (topic) ───────────────────────────────────────────
export interface Chapter {
  slug: string;              // "population"
  title: string;
  summary: string;
  heroStat: DataPoint;
  series: TimeSeries[];      // at least one with >= 5 points
  explainers: Array<{ title: string; body: string }>;
  sources: Array<{ label: string; url: string }>;
}

// ─── Map-rendering shape (UNCHANGED — do not edit) ──────────────
export interface DistrictData {
  id: string;
  name: string;
  division: "West Coast" | "Interior" | "Kudat" | "Sandakan" | "Tawau";
  population: string;
  popShare: string;
  medianIncome: string;
  incomeContext: string;
  tempAnomaly: string;
  rainfallPct: string;
  elevation: string;
  keyDriver: string;
  description: string;
  forestCover: string;
  riverBasin: string;
  panBorneoStatus: string;
  gridMargin: string;
  svgPath: string;
  labelCoords: { x: number; y: number };
}

// ─── Typed profile for /districts/[slug] and /compare ───────────
// Same object as DistrictData, plus numeric metrics that can be
// sorted, compared, and charted. Populate in static-data.ts.
export interface DistrictProfile extends DistrictData {
  populationCount: DataPoint;   // numeric, for sort
  incomeCount: DataPoint;       // numeric RM, for sort + compare
  povertyRate?: DataPoint;      // % below PLI
  schools: { primary: number; secondary: number };
  clinics: number;
  economicBase: string[];       // ["Oil & gas", "Tourism"]
  lat: number;
  lng: number;
}

// ─── A story / explainer ─────────────────────────────────────────
export interface Story {
  slug: string;
  title: string;
  dek: string;                  // one-line standfirst
  heroImage?: string;           // path under /public/images/stories
  relatedChapter?: string;      // links back to a Chapter slug
  body: Array<{ type: "para" | "quote" | "data"; text: string }>;
  sources: Array<{ label: string; url: string }>;
}