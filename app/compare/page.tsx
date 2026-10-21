import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "District Comparison — State of Sabah",
  description: "Compare economic, demographic, and climate metrics across Sabah's districts.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] font-sans selection:bg-stone-800 selection:text-stone-100">
      
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 pt-12">
        <header className="pb-10 border-b border-[#E5E0D8]">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            Comparative Analysis
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight text-stone-950 mb-4">
            District vs. District Benchmark
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg leading-relaxed">
            Contrast living standards, median household income, population distribution, and climate anomalies side-by-side across Sabah&apos;s administrative divisions.
          </p>
        </header>

        <section className="py-12">
          <div className="bg-white border border-[#E5E0D8] rounded-lg p-12 text-center">
            <p className="font-mono text-sm text-stone-500 mb-2">Interactive Benchmarking Matrix</p>
            <p className="font-serif text-xl text-stone-900">Select two districts above to compare metrics.</p>
          </div>
        </section>
      </main>

    </div>
  );
}