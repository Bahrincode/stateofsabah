"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  isSpecial?: boolean;
}

const navItems: NavItem[] = [
  { label: "Today", href: "/" },
  { label: "Topic", href: "/topics" },
  { label: "Districts", href: "/districts" },
  { label: "Stories", href: "/stories" },
  { label: "Compare", href: "/compare" },
  { label: "Maps", href: "/maps", isSpecial: true },
];

// Topic categories matching the broadsheet layout
const TOPIC_CATEGORIES = [
  {
    title: "PEOPLE & SOCIETY",
    topics: [
      { name: "Population", href: "/topics/population", status: "BETA" },
      { name: "Employment", href: "/topics/employment", status: "BETA" },
      { name: "Cost of Living", href: "/topics/cost-of-living", status: "BETA" },
      { name: "Housing", href: "/topics/housing", status: "BETA" },
      { name: "Education", href: "/topics/education", status: "BETA" },
      { name: "Healthcare", href: "/topics/healthcare", status: "BETA" },
      { name: "Safety", href: "/topics/safety", status: "BETA" },
      { name: "Culture", href: "/topics/culture", status: "BETA" },
    ],
  },
  {
    title: "ECONOMY & WORK",
    topics: [
      { name: "Economy", href: "/topics/economy", status: "BETA" },
      { name: "Business", href: "/topics/business", status: "BETA" },
      { name: "Tourism", href: "/topics/tourism", status: "BETA" },
      { name: "Agriculture", href: "/topics/agriculture", status: "BETA" },
    ],
  },
  {
    title: "ENVIRONMENT & RESOURCES",
    topics: [
      { name: "Climate", href: "/topics/climate", status: "LIVE" },
      { name: "Water", href: "/topics/water", status: "BETA" },
      { name: "Energy", href: "/topics/energy", status: "BETA" },
      { name: "Environment", href: "/topics/environment", status: "BETA" },
    ],
  },
  {
    title: "MOVEMENT & SYSTEMS",
    topics: [
      { name: "Transport", href: "/topics/transport", status: "BETA" },
      { name: "Infrastructure", href: "/topics/infrastructure", status: "BETA" },
    ],
  },
  {
    title: "GOVERNMENT",
    topics: [
      { name: "Government", href: "/topics/government", status: "BETA" },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [topicsOpen, setTopicsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTopicsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setTopicsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-35 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E5E0D8]" ref={dropdownRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-baseline gap-1.5 text-lg tracking-tight group">
            <span className="font-serif font-semibold text-stone-950 group-hover:text-emerald-950 transition-colors">
              State
            </span>
            <span className="text-stone-500 font-light">of Sabah</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              let className = "transition-colors font-sans relative flex items-center gap-1 ";

              if (isActive) {
                className += "font-semibold text-stone-950";
              } else if (item.isSpecial) {
                className += "text-emerald-800 hover:text-stone-950 font-normal";
              } else {
                className += "text-stone-600 hover:text-stone-950 font-normal";
              }

              // Special handling for Topic dropdown toggle
              if (item.label === "Topic") {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setTopicsOpen(!topicsOpen)}
                      className={className}
                      aria-expanded={topicsOpen}
                    >
                      {item.label}
                      <span className={`text-[10px] transition-transform duration-200 ${topicsOpen ? "rotate-180" : ""}`}>
                        ▲
                      </span>
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={className}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-500 hidden sm:inline">
            KK · SDK · TWU · KGU
          </span>
          <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest bg-stone-200/80 text-stone-700 rounded">
            Beta
          </span>
        </div>
      </div>

      {/* MEGA-MENU DROPDOWN CONTAINER (Positioned below the header) */}
      {topicsOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-[#E5E0D8] shadow-xl py-8 px-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            {TOPIC_CATEGORIES.map((category) => (
              <div key={category.title} className="space-y-3">
                <p className="text-[11px] font-mono tracking-widest text-stone-400 uppercase border-b border-[#E5E0D8] pb-1.5">
                  {category.title}
                </p>
                <ul className="space-y-2">
                  {category.topics.map((t) => (
                    <li key={t.name}>
                      <Link
                        href={t.href}
                        className="group flex items-center justify-between text-sm text-stone-700 hover:text-stone-950 transition-colors py-0.5"
                      >
                        <span className="group-hover:underline font-sans">{t.name}</span>
                        <span className={`text-[9px] font-mono px-1 py-0.5 rounded ${
                          t.status === "LIVE" ? "text-emerald-700 bg-emerald-50" : "text-stone-400 bg-stone-100"
                        }`}>
                          {t.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-stone-500 font-mono">
            <p>Climate is chapter one — the rest of the library is being researched in the open, and says so.</p>
            <Link href="/topics" className="text-stone-950 hover:underline font-semibold flex items-center gap-1">
              All topics →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;