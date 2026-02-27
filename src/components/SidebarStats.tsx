'use client';

import { ArrowUpDown, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useTokenPrice } from '../hooks/useTokenPrice';

export function SidebarStats() {
    const { isConnected } = useAccount();
    const { price, change24h, marketCap, loading, error } = useTokenPrice('ethereum', 'usd');

    const assets = [
        { name: 'The Godfather', symbol: 'TGF', amount: 0.45, price: 240.00, change: 1.77, up: true, img: 'https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
        { name: 'KGF', symbol: 'KGF', amount: 0.02, price: 80.00, change: 0.4, up: true, img: 'https://image.tmdb.org/t/p/w200/uJ1wEsUKNl3XgZESrE706N9M6iV.jpg' },
        { name: 'Avatar', symbol: 'AVATAR', amount: 147.12, price: 147.05, change: 1.2, up: true, img: 'https://image.tmdb.org/t/p/w200/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg' },
    ];

    const isUp = (change24h ?? 0) >= 0;
    const displayPrice = price !== null ? `$${price.toFixed(4)}` : loading ? 'Loading...' : 'N/A';
    const displayChange =
        change24h !== null
            ? `${isUp ? '+' : ''}${change24h.toFixed(2)}%`
            : loading
                ? '...'
                : 'N/A';
    const displayFdv =
        marketCap !== null
            ? `$${(marketCap / 1_000_000).toFixed(1)}M`
            : loading
                ? '—'
                : 'N/A';

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Token Card */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 opacity-80" stroke="currentColor" strokeWidth={2}>
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-tight">SOWNALPHA</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-semibold text-slate-800">
                                {displayPrice}
                            </span>
                            <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                    isUp ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-red-100 text-red-500'
                                }`}
                            >
                                {error ? 'ERR' : displayChange}
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase">
                            FDV{' '}
                            <span className="text-slate-800 font-bold">
                                {displayFdv}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Mock Sparkline (still static for now) */}
                <div className="w-24 h-12 ml-4">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#10b981]" fill="none" strokeWidth="2">
                        <path d="M0,5 Q10,5 20,10 T40,15 T60,10 T80,20 T100,25" className="stroke-[#10b981]" />
                        <path d="M0,5 Q10,5 20,10 T40,15 T60,10 T80,20 T100,25 L100,30 L0,30 Z" className="fill-[#10b981]/10 stroke-none" />
                    </svg>
                </div>
            </div>

            {/* Asset List Container */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex-1 flex flex-col">
                {/* Tabs */}
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                    <div className="flex gap-4">
                        <button className="text-sm font-bold text-slate-900 border-b-2 border-slate-900 pb-2 -mb-[9px]">Asset</button>
                        <button className="text-sm font-medium text-slate-400 pb-2 hover:text-slate-600">Collectibles</button>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600"><ArrowUpDown size={14} /></button>
                </div>

                {/* List Body */}
                <div className="flex-1 flex flex-col">
                    {!isConnected ? (
                        <div className="flex flex-col items-center justify-center flex-1 h-full opacity-60 m-auto pb-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Wallet className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-900 font-bold text-sm">Wallet Disconnected</p>
                            <p className="text-slate-500 text-xs mt-1 text-center max-w-[200px]">Connect your wallet to view your active movie assets and collectibles.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5">
                            {assets.map((asset, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                            <img src={asset.img} alt={asset.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{asset.name}</p>
                                            <p className="text-[11px] font-semibold text-slate-500 uppercase">{asset.amount} {asset.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">${asset.price.toFixed(2)}</p>
                                        <p className={`text-[11px] font-bold ${asset.up ? 'text-[#10b981]' : 'text-red-500'}`}>
                                            {asset.up ? '+' : '-'}{asset.change}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
