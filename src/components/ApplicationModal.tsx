import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationModalProps {
    onClose: () => void;
}

export default function ApplicationModal({ onClose }: ApplicationModalProps) {
    const [isHovering, setIsHovering] = useState(false);

    // Pre-calculate random properties in useEffect to maintain render purity
    const [particles, setParticles] = React.useState<{ id: number, icon: string, initX: number, animY: number, animX: number, rotate: number, scale: number, duration: number, delay: number }[]>([]);

    React.useEffect(() => {
        setParticles([...Array(8)].map((_, i) => ({
            id: i,
            icon: i % 3 === 0 ? '🎬' : i % 3 === 1 ? '💎' : '⚡️',
            initX: (Math.random() - 0.5) * 120,
            animY: -120 - (Math.random() * 80),
            animX: (Math.random() - 0.5) * 150 + (Math.random() - 0.5) * 30,
            rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
            scale: 0.5 + Math.random(),
            duration: 1.5 + Math.random(),
            delay: Math.random() * 0.4
        })));
    }, []);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#0b0e14] border border-[#2b3344] text-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] relative"
                >
                    <div className="sticky top-0 bg-[#0b0e14]/90 backdrop-blur pb-4 pt-8 px-8 border-b border-white/5 flex items-start justify-between z-10">
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                                <span className="text-3xl">🎬</span> Lights. Camera. Liquid Assets.
                            </h2>
                            <p className="mt-3 text-slate-400 text-[15px] leading-relaxed max-w-xl font-medium">
                                OwnAlpha is decentralizing the silver screen. We are looking for visionary producers, filmmakers, and creators to launch the next generation of Movie NFTs.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 border border-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-lg font-bold text-blue-400 mb-2 font-display tracking-tight flex items-center gap-2">
                                Ready to propose your production?
                            </h3>
                            <p className="text-slate-300 text-[15px] leading-relaxed font-medium">
                                You are about to enter the MetaDAO governance pipeline. Ensure your pitch deck, budget breakdown, and distribution strategy are ready for the community to audit.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Creative Hook</label>
                                <input
                                    type="text"
                                    placeholder="What is the 1-sentence logline of your film that will make a DeFi trader want to hold the NFT?"
                                    className="w-full bg-[#131823] border border-[#2b3344] rounded-2xl px-5 py-4 text-[15px] focus:outline-none focus:border-blue-500 focus:bg-[#1a2133] transition-colors text-white placeholder:text-slate-600 font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Financials</label>
                                <input
                                    type="text"
                                    placeholder="What is your total budget in USDC, and what is the projected ROI for the DAO treasury?"
                                    className="w-full bg-[#131823] border border-[#2b3344] rounded-2xl px-5 py-4 text-[15px] focus:outline-none focus:border-blue-500 focus:bg-[#1a2133] transition-colors text-white placeholder:text-slate-600 font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Proof of Talent</label>
                                <input
                                    type="text"
                                    placeholder="Link your IMDb, portfolio, or previous production credits."
                                    className="w-full bg-[#131823] border border-[#2b3344] rounded-2xl px-5 py-4 text-[15px] focus:outline-none focus:border-blue-500 focus:bg-[#1a2133] transition-colors text-white placeholder:text-slate-600 font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Web3 Integration</label>
                                <textarea
                                    rows={3}
                                    placeholder="How does this film leverage 'OwnAlpha' mechanics (e.g., exclusive scenes for holders, voting on endings)?"
                                    className="w-full bg-[#131823] border border-[#2b3344] rounded-2xl px-5 py-4 text-[15px] focus:outline-none focus:border-blue-500 focus:bg-[#1a2133] transition-colors text-white placeholder:text-slate-600 font-medium shadow-inner resize-none min-h-[120px]"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-center">
                            <div
                                className="relative w-full sm:w-auto"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {/* Floating "Alpha" Tokens / Reels background effect */}
                                <motion.div className="absolute inset-x-0 bottom-full h-40 pointer-events-none flex items-end justify-center">
                                    {particles.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            className="absolute text-blue-400 text-2xl z-20 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                x: p.initX
                                            }}
                                            animate={{
                                                opacity: isHovering ? [0, 1, 0] : 0,
                                                y: isHovering ? p.animY : 20,
                                                x: isHovering ? p.animX : p.initX,
                                                rotate: isHovering ? p.rotate : 0,
                                                scale: isHovering ? p.scale : 0.5
                                            }}
                                            transition={{
                                                duration: p.duration,
                                                repeat: isHovering ? Infinity : 0,
                                                delay: p.delay,
                                                ease: "easeOut"
                                            }}
                                        >
                                            {p.icon}
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <button
                                    onClick={onClose}
                                    className="relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(37,99,235,0.4)] text-[16px] tracking-wide z-10 w-full sm:w-auto min-w-[340px] border border-blue-400/30"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <span className="text-xl">🚀</span> Submit Proposal to MetaDAO
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
