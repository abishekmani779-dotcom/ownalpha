'use client';

import { Navbar } from '@/components/Navbar';
import { SearchFilter } from '@/components/SearchFilter';
import { MovieRow } from '@/components/MovieRow';
import { SidebarStats } from '@/components/SidebarStats';
import { HeroProject } from '@/components/HeroProject';
import { BottomCards } from '@/components/BottomCards';
import { X, Send } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col px-4 lg:px-8 py-2 w-full max-w-[1600px] mx-auto">
      {/* Top Navbar */}
      <div className="mb-6 -mx-4 lg:-mx-8 border-b-0">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col gap-6">
        {/* Search and Filter */}
        <SearchFilter />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight ml-1">Released Movies</h2>
          {/* Top Carousel Row */}
          <MovieRow />
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Left Column (Stats + Assets) */}
          <div className="col-span-1 md:col-span-4 h-full">
            <SidebarStats />
          </div>

          {/* Right Column (Hero Project) */}
          <div className="col-span-1 md:col-span-8 h-full">
            <HeroProject />
          </div>
        </div>

        {/* Bottom Cards */}
        <BottomCards />
      </div>

      {/* Footer */}
      <footer className="w-full py-6 flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block shadow-sm" />
            BNB: <span className="text-slate-800">$87.23</span>
          </span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Support</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Founders</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms of Service</span>
          <div className="flex items-center gap-3 ml-2">
            <button className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={14} strokeWidth={2.5} />
            </button>
            <button className="text-slate-400 hover:text-slate-900 transition-colors">
              <Send size={14} strokeWidth={2.5} className="rotate-45" />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
