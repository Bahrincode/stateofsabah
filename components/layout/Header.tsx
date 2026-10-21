"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  isSpecial?: boolean;
}

const navItems: NavItem[] = [
  { label: "Today", href: "/" },
  { label: "Districts", href: "/districts" },
  { label: "Stories", href: "/stories" },
  { label: "Compare", href: "/compare" },
  { label: "Maps", href: "/maps", isSpecial: true },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E5E0D8]">
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
              // Exact match for home, prefix match for nested routes like /districts/ranau
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              let className = "transition-colors font-sans ";

              if (isActive) {
                // The ONLY item that gets prominent active styling
                className += "font-semibold text-stone-950";
              } else if (item.isSpecial) {
                // Inactive Maps link: standard weight with subtle green tint
                className += "text-emerald-800 hover:text-stone-950 font-normal";
              } else {
                // Standard inactive link
                className += "text-stone-600 hover:text-stone-950 font-normal";
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
    </header>
  );
}

export default Header;