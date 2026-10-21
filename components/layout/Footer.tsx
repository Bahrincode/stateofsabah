import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#F3F0EA] border-t border-[#E5E0D8] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-serif text-2xl sm:text-3xl text-stone-900 mb-10">
          Sabah deserves a public record everyone can understand.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5E0D8]">
          <div className="lg:col-span-6">
            <p className="flex items-baseline gap-1.5 text-lg mb-3">
              <span className="font-serif font-semibold">State</span>
              <span className="text-stone-500">of Sabah</span>
            </p>
            <p className="text-sm text-stone-600 leading-relaxed max-w-md mb-6">
              An independent open-data project that turns public statistics on Sabah into stories people can understand. Not an official government service. Climate and Spatial Maps are chapter one — every page says exactly what its numbers are.
            </p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-stone-700">
              <Link href="/" className="hover:underline">Topics</Link>
              <Link href="/districts" className="hover:underline">Districts (27)</Link>
              <Link href="/stories" className="hover:underline">Stories</Link>
              <Link href="/compare" className="hover:underline">Compare</Link>
              <Link href="/maps" className="hover:underline">Maps</Link>
              <Link href="/methodology" className="hover:underline">Sources & Methodology</Link>
            </nav>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
              How to read our numbers
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded">
                <dt className="font-mono font-semibold text-emerald-800 mb-1">Live</dt>
                <dd className="text-stone-600 leading-relaxed">
                  Read from an operational meteorological or river sensor feed within the last few hours.
                </dd>
              </div>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded">
                <dt className="font-mono font-semibold text-stone-900 mb-1">Official latest</dt>
                <dd className="text-stone-600 leading-relaxed">
                  The most recent release from DOSM, MPOB, or Sabah agencies — real, but published on their schedule.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="pt-8 text-xs font-mono text-stone-500">
          Built as a 2026 open-data portrait of Sabah · Unofficial government service · Primary sources include OpenDOSM, MetMalaysia, MPOB, and Sabah Forestry Department.
        </p>
      </div>
    </footer>
  );
}