import React from "react";

export function Sparkline({ points, color = "#1c1917" }: { points: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 28" className="w-full h-7 overflow-visible my-2">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}