// components/ui/StatusBadge.tsx
import React from "react";
import { DataStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: DataStatus | string; // Allows flexibility while maintaining type safety
}

const statusStyles: Record<string, string> = {
  Live: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Official latest": "bg-stone-100 text-stone-700 border-stone-200",
  Forecast: "bg-amber-50 text-amber-800 border-amber-200",
  Documented: "bg-indigo-50 text-indigo-800 border-indigo-200",
  Illustrative: "bg-rose-50 text-rose-800 border-rose-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-stone-100 text-stone-700 border-stone-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider border rounded ${style}`}
    >
      {status}
    </span>
  );
}