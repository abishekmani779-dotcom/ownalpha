import { Search, SlidersHorizontal } from 'lucide-react';

export function SearchFilter() {
    return (
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mb-2">
            <div className="relative flex-1 max-w-2xl w-full">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search movies, projects, or genres..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-100 rounded-2xl text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-sm whitespace-nowrap transition-colors">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-bold text-sm whitespace-nowrap shadow-sm transition-colors">
                    All
                </button>
                <button className="px-5 py-3 bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm whitespace-nowrap shadow-sm transition-colors">
                    Active IMO
                </button>
                <button className="px-5 py-3 bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm whitespace-nowrap shadow-sm transition-colors">
                    Upcoming
                </button>
                <button className="px-5 py-3 bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm whitespace-nowrap shadow-sm transition-colors">
                    Past
                </button>
            </div>
        </div>
    );
}
