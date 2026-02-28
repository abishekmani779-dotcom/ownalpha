'use client';

import { motion } from 'framer-motion';
import { useOracle } from '@/hooks/useOracle';
import { ExternalLink, TrendingUp, AlertCircle } from 'lucide-react';
import { MintingModal } from './MintingModal';
import { useState } from 'react';

export function HypeHub() {
    const oracleData = useOracle();
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

    return (
        <section className="py-12 px-4 container mx-auto">
            <div className="mb-8 border-l-4 border-[#00F3FF] pl-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Hype Hub</h2>
                <p className="text-slate-400 mt-1">Trade upcoming releases before they hit the box office.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {oracleData.map((movie, idx) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] hover:border-[#00F3FF]/50"
                    >
                        {/* Poster Header */}
                        <div className="h-48 relative overflow-hidden bg-slate-800">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${movie.poster})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-xl font-bold text-white drop-shadow-md">{movie.title}</h3>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4 text-[#00F3FF]" />
                                    Projected
                                </span>
                                <span className="text-white font-semibold">${movie.projectedRevenue.toFixed(1)}M</span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium flex items-center gap-1">
                                    <ExternalLink className="w-4 h-4 text-[#E50914]" />
                                    Actual
                                </span>
                                <span className="text-white font-semibold">${movie.actualRevenue.toFixed(1)}M</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Box Office Progress</span>
                                    <span className="text-[#00F3FF] font-medium">{movie.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(movie.progress, 100)}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-[#00F3FF] rounded-full"
                                    />
                                </div>
                                {movie.progress >= 100 && (
                                    <p className="text-xs text-[#E50914] flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3" /> Projection Exceeded
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedMovie(movie.id)}
                                    className="px-4 py-2 rounded-lg bg-[#00F3FF] text-[#0B0B0B] font-semibold tracking-wide hover:bg-[#00F3FF]/90 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                                >
                                    Trade
                                </button>
                                <div className="px-4 py-2 rounded-lg bg-white/10 text-white font-semibold text-center border border-white/5">
                                    {movie.multiplier}x Multi
                                </div>
                            </div>
                        </div>

                        {selectedMovie === movie.id && (
                            <MintingModal movie={movie} amount="100" contractAddress="" onClose={() => setSelectedMovie(null)} />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
