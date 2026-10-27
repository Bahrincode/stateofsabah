# State of Sabah — A Living Data-Driven Portrait

> An independent open-data web application transforming public statistics, climate telemetry, and geospatial boundaries into an interactive digital broadsheet for Sabah’s 27 districts.

![Next.js App Router](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![D3.js](https://img.shields.io/badge/D3.js-Geo-F9A01B?style=flat-square&logo=d3.js)

---

## Overview

**State of Sabah** is a data journalism and regional telemetry platform inspired by minimalist broadsheet aesthetics. Built to bridge the gap between complex government datasets and public understanding, the application organizes information by **life and societal impact** rather than rigid government agency silos.

The platform combines server-side asynchronous data fetching with interactive client-side spatial map rendering, providing citizens, researchers, and policymakers with deep visibility into Sabah's demographic trends, economic indicators, and live environmental conditions.

---

## Key Features

* **Interactive D3-Geo Cartography:** Client-side SVG projection rendering Sabah’s 5 administrative divisions and 27 districts using custom GeoJSON boundaries. Supports instant layer toggling between administrative outlines and live climate heatmaps.
* **Dynamic District Profiles (`/districts/[slug]`):** Dedicated, data-rich profile pages for all 27 administrative districts (from Kota Kinabalu and Sandakan to Nabawan and Pitas), complete with local population metrics, median income figures, elevation profiles, and infrastructure indices.
* **Long-Form Data Journalism (`/stories/[slug]`):** Editorial explainers investigating regional cost-of-living variances, topographic distribution frictions, and rainforest microclimate dynamics.
* **Live Telemetry & Bento Grid:** Real-time meteorological station anomaly trackers, Sparkline trend curves, and strict data provenance badges (*Live*, *Official Latest*, *Forecast*).
* **Responsive Broadsheet Layout:** Clean typographic hierarchy using variable fonts (*Newsreader*, *Inter*, *JetBrains Mono*) coupled with exposed 1px grid borders and tabular numerals.

---

## Tech Stack

* **Framework:** Next.js (App Router, Server & Client Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 with custom CSS variables and broadsheet base rules
* **Geospatial & Visualization:** D3-Geo (`d3-geo`, `d3-mercator`) for custom SVG map projections and responsive scaling
* **Typography:** Google Fonts (`Newsreader`, `Inter`, `JetBrains_Mono`)

---

## Project Structure

```text
state-of-sabah/
├── app/                      # Next.js App Router pages & dynamic routes
│   ├── layout.tsx            # Root layout wrapping global Header & Footer
│   ├── page.tsx              # Homepage dashboard (Bento grid & live telemetry)
│   ├── districts/            # District directory & dynamic [slug] profile pages
│   ├── stories/              # Investigative essays & dynamic [slug] reader
│   ├── compare/              # Cross-district comparison tools
│   └── maps/                 # Full-screen spatial map view
├── components/               # Modular UI and feature components
│   ├── layout/               # Header (with active route detection) & Footer
│   ├── maps/                 # SabahDashboardMap (D3 SVG cartography)
│   ├── ui/                   # StatusBadge & Sparkline trend components
│   └── widgets/              # DistrictSpotlight rotation cards
├── public/                   # Static assets & GIS shapefiles
│   └── geo/
│       └── sabah-districts.geojson  # 27 Sabah district boundaries
└── lib/                      # Data fetchers, mock databases & static constants