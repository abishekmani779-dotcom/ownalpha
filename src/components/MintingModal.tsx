'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BoxOfficeData } from '@/hooks/useOracle';
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
    movie: BoxOfficeData;
    onClose: () => void;
}

export function MintingModal({ movie, onClose }: Props) {
    const [step, setStep] = useState(0); // 0: Review, 1: Approving, 2: Signing, 3: Success

    const handleMint = async () => {
        setStep(1);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate approve
        setStep(2);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate sign
        setStep(3);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0B0B0B] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Mint Position</h2>
                    <p className="text-slate-400 text-sm mt-1">{movie.title}</p>
                </div>

                <div className="p-6 space-y-6">
                    {step === 0 && (
                        <>
                            <div className="space-y-4">
                                <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-slate-400">Position Size</span>
                                    <span className="text-white font-semibold">100 USDC</span>
                                </div>
                                <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-slate-400">Target Multiplier</span>
                                    <span className="text-[#00F3FF] font-semibold">{movie.multiplier}x</span>
                                </div>
                                <div className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-slate-400">Gas Estimate (Optimism)</span>
                                    <span className="text-white font-semibold">~$0.02</span>
                                </div>
                            </div>

                            <button
                                onClick={handleMint}
                                className="w-full py-4 rounded-xl bg-[#00F3FF] text-[#0B0B0B] font-bold text-lg hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
                            >
                                Confirm Transaction
                            </button>
                        </>
                    )}

                    {(step === 1 || step === 2) && (
                        <div className="py-12 flex flex-col items-center justify-center space-y-6">
                            <Loader2 className="w-12 h-12 text-[#00F3FF] animate-spin" />
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold text-white">
                                    {step === 1 ? 'Approving USDC...' : 'Signing Transaction...'}
                                </h3>
                                <p className="text-slate-400 text-sm">Please confirm in your wallet</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-12 flex flex-col items-center justify-center space-y-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12 }}
                            >
                                <CheckCircle className="w-16 h-16 text-[#00F3FF]" />
                            </motion.div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white">Position Minted!</h3>
                                <p className="text-slate-400 text-sm">Your MNFT is now in your vault.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors mt-4"
                            >
                                Return to Hub
                            </button>
                        </div>
                    )}

                </div>
            </motion.div>
        </div>
    );
}
