// lib/fetchers.ts

// 1. OPEN-METEO API: Live Temperature & Rainfall
export async function getLiveClimateData() {
  // Coordinates for BKI, KUD, KGU, SDK, TWU, DNM
  const lats = "5.937,6.921,5.337,5.901,4.313,4.966";
  const lons = "116.051,116.835,116.160,118.059,118.122,117.805";
  
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,precipitation&timezone=Asia/Kuching`,
      { next: { revalidate: 1800 } } // Refresh every 30 minutes
    );
    
    if (!res.ok) throw new Error("Failed to fetch weather data");
    
    const data = await res.json();
    
    // Process data to calculate anomalies (mock baseline for prototype)
    // In a real app, you would subtract these current temps from a 1991-2020 baseline dataset
    return data.map((station: any, index: number) => ({
      temp: station.current.temperature_2m,
      rainfall: station.current.precipitation,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 2. OPENDOSM API: Sabah Official Statistics
export async function getOfficialSabahData() {
  try {
    // We fetch multiple endpoints in parallel using Promise.all
    const [cpiRes, labourRes] = await Promise.all([
      // Fetch state-level Consumer Price Index (Inflation)
      fetch("https://api.data.gov.my/data-catalogue?id=cpi_state&state=Sabah", {
        next: { revalidate: 86400 }, // Refresh once a day
      }),
      // Fetch state-level Labour Force (Unemployment)
      fetch("https://api.data.gov.my/data-catalogue?id=lfs_state&state=Sabah", {
        next: { revalidate: 86400 },
      })
    ]);

    const cpiData = await cpiRes.json();
    const labourData = await labourRes.json();

    return {
      cpi: cpiData,
      labour: labourData
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}