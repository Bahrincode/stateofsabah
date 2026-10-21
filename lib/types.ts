// lib/types.ts

export type DataStatus = "Live" | "Official latest" | "Forecast" | "Documented" | "Illustrative";

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