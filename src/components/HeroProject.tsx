import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HeroProject() {
    return (
        <Link href="/project/avatar" className="block relative rounded-2xl overflow-hidden shadow-sm h-full min-h-[400px] flex flex-col justify-end group cursor-pointer transition-transform hover:scale-[1.01]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/t6HIqrNDIGGLt5ALQp11vH12aFv.jpg')` }} // Avatar full poster
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Content */}
            <div className="relative z-10 p-8 w-full">
                {/* Sub logo image (thumbnail over the hero image) */}
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 shadow-xl border border-white/20">
                    <img src="https://image.tmdb.org/t/p/w200/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" className="w-full h-full object-cover" alt="Avatar logo" />
                </div>

                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-4xl font-bold text-white tracking-tight">Avatar the way of water</h2>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase self-center translate-y-0.5">
                        $AVATAR
                    </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-end justify-between mb-4">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[10px] font-bold text-white/60 mb-1 uppercase tracking-wider">Amount Raised</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-white leading-none">$7.40K</span>
                                <span className="bg-[#10b981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">2%</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-white/60 mb-1 uppercase tracking-wider">Target</p>
                            <span className="text-xl font-bold text-white leading-none">$300K</span>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-white/60 mb-1 uppercase tracking-wider">Contributors</p>
                            <span className="text-xl font-bold text-white leading-none">35</span>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-white/60 mb-1 uppercase tracking-wider">Ends In</p>
                            <span className="bg-[#10b981] text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">Ended</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-white/20 rounded-full mt-4 overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-white rounded-full w-[2%]" />
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex gap-2">
                <button className="w-10 h-10 bg-white/90 hover:bg-white text-black rounded flex items-center justify-center transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button className="w-10 h-10 bg-white/90 hover:bg-white text-black rounded flex items-center justify-center transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </Link>
    );
}
