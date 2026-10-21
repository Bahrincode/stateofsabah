import React from "react";
import { DataStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: DataStatus }) {
  const styles: Record<DataStatus, string> = {
    Live: "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Official latest": "bg-stone-100 text-stone-700 border-stone-200",
    Forecast: "bg-amber-50 text-amber-800 border-amber-200",
    Documented: "bg-indigo-50 text-indigo-800 border-indigo-200",
    Illustrative: "bg-rose-50 text-rose-800 border-rose-200",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider border rounded-full ${styles[status]}`}>
      {status === "Live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
      )}
      {status}
    </span>
  );
}