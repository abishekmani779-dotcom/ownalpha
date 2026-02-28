'use client';
import { useState } from 'react';
import { Calendar, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

export function BottomCards() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="grid grid-cols-12 gap-4 h-24 pb-6">

            {/* View Upcoming */}
            <div className="col-span-3 bg-[#EAECEF] hover:bg-white transition-colors cursor-pointer rounded-2xl p-5 flex items-end shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 pb-1">
                    <Calendar size={18} strokeWidth={2} />
                    <span className="font-bold text-[13px]">View upcoming episodes</span>
                </div>
            </div>

            {/* Ready to Raise */}
            <div className="col-span-5 bg-blue-600 rounded-2xl p-5 flex items-end justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                {/* Decorative sparkles */}
                <div className="absolute top-4 left-4 text-white/40"><Sparkles size={14} /></div>
                <div className="absolute bottom-4 left-1/2 text-white/30"><Sparkles size={10} /></div>

                <span className="text-white text-base font-bold tracking-tight pb-1 relative z-10">
                    Ready to raise?
                </span>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-white text-sm font-semibold tracking-tight pb-1 hover:underline relative z-10"
                >
                    Apply here
                </button>
            </div>

            {/* About Us */}
            <div className="col-span-2 bg-white rounded-2xl p-5 flex items-end justify-between shadow-sm hover:shadow transition-shadow cursor-pointer">
                <div className="flex items-center gap-2 text-slate-900 pb-1">
                    <Sparkles size={18} strokeWidth={2} className="text-slate-800" />
                    <span className="font-bold text-[13px]">About us</span>
                </div>
                <ArrowUpRight size={18} className="text-slate-500 pb-1" />
            </div>

            {/* Docs */}
            <div className="col-span-2 bg-[#EAECEF] hover:bg-white transition-colors cursor-pointer rounded-2xl p-5 flex items-end shadow-sm border border-slate-100/50">
                <div className="flex items-center gap-2 text-slate-900 pb-1">
                    <BookOpen size={18} strokeWidth={2} />
                    <span className="font-bold text-[13px]">The docs</span>
                </div>
            </div>

            {showModal && <ApplicationModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
