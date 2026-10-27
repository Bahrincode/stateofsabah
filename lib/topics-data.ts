// lib/topics-data.ts

export interface TopicMetric {
  title: string;
  value: string;
  unit?: string;
  context: string;
  status: "Live" | "Official latest" | "Forecast";
  trend?: "up" | "down" | "neutral";
}

export interface TopicDetail {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  heroMetric: TopicMetric;
  secondaryMetrics: TopicMetric[];
  relatedStorySlugs: string[];
}

export const TOPICS_DATA: Record<string, TopicDetail> = {
  "climate": {
    slug: "climate",
    title: "Climate & Environment",
    description: "Tracking the physical realities of Sabah's environment. From surface heat anomalies across the East Coast palm estates to real-time flood telemetry in the Kinabatangan and Padas river basins.",
    lastUpdated: "October 2026",
    heroMetric: {
      title: "State Mean Anomaly",
      value: "+1.2",
      unit: "°C",
      context: "The 30-day rolling average for Sabah sits significantly above the 1991–2020 climatological baseline. The East Coast districts of Sandakan and Tawau are currently experiencing the highest thermal stress.",
      status: "Live",
      trend: "up"
    },
    secondaryMetrics: [
      {
        title: "Kinabatangan Basin",
        value: "8.42m",
        context: "River levels at Bukit Garam are currently elevated following persistent inland precipitation. Danger threshold is 9.50m.",
        status: "Live",
        trend: "up"
      },
      {
        title: "West Coast Rainfall",
        value: "118%",
        context: "Cumulative precipitation across the Crocker Range western slopes is trending above the October historical normal.",
        status: "Live",
        trend: "up"
      }
    ],
    relatedStorySlugs: ["canopy-cooling"]
  },
  "economy": {
    slug: "economy",
    title: "Economy & Trade",
    description: "Tracking macroeconomic stability, commodity exports, and domestic consumption across Sabah's five administrative divisions.",
    lastUpdated: "September 2026",
    heroMetric: {
      title: "Real GDP Growth",
      value: "+4.4",
      unit: "%",
      context: "Year-over-year economic expansion, driven primarily by services (51.2%), mining & quarrying (23.4%), and agriculture (15.8%).",
      status: "Official latest",
      trend: "up"
    },
    secondaryMetrics: [
      {
        title: "Headline Inflation",
        value: "+1.6%",
        context: "Consumer Price Index (CPI) year-on-year growth. Rural interior districts continue to see higher logistics premiums.",
        status: "Official latest",
        trend: "neutral"
      },
      {
        title: "Crude Palm Oil Output",
        value: "382K",
        unit: " tonnes",
        context: "Monthly output across Sabah mills, maintaining the state's position as the largest producing region in Malaysia.",
        status: "Official latest",
        trend: "up"
      }
    ],
    relatedStorySlugs: ["grocery-bill-geography", "pan-borneo-pulse"]
  }
};