'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { BoxOfficeData } from '@/hooks/useOracle';

interface Props {
    data: BoxOfficeData[];
}

export function TradeTerminal({ data }: Props) {
    // Aggregate mock chart data over 6 simulated time points based on current actual revenue
    const chartData = [0, 1, 2, 3, 4, 5].map(i => {
        return {
            day: `Day ${i + 1}`,
            projected: 700 + (Math.random() * 50 * i),
            actual: 650 + (Math.random() * 80 * i),
        };
    });

    return (
        <section className="py-12 px-4 container mx-auto mb-20">
            <div className="mb-8 border-l-4 border-[#00F3FF] pl-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Terminal Dashboard</h2>
                <p className="text-slate-400 mt-1">Real-time aggregate box office trends</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart Card */}
                <div className="lg:col-span-2 bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg">
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-white font-bold">Global Collections Forecast</h3>
                        <div className="flex gap-4 text-xs">
                            <span className="flex items-center gap-2 text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Projected</span>
                            <span className="flex items-center gap-2 text-slate-400"><span className="w-2 h-2 rounded-full bg-[#00F3FF]"></span> Actual</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00F3FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00F3FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="day" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#ffffff50" fontSize={12} tickFormatter={(val) => `$${val}M`} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="projected" stroke="#3b82f6" fill="opacity-0" strokeWidth={2} strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="actual" stroke="#00F3FF" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Portfolio Stats Card */}
                <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between">
                    <div>
                        <h3 className="text-white font-bold mb-6">Your Vault</h3>
                        <div className="space-y-6">
                            <div>
                                <span className="text-slate-400 text-sm block mb-1">Total Value</span>
                                <span className="text-3xl font-bold text-white">$1,450.00</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-sm block mb-1">Unrealized PnL</span>
                                <span className="text-lg font-bold text-[#00F3FF]">+ $450.00 (45%)</span>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-slate-400 text-sm block mb-2">Active Positions</span>
                                <div className="flex justify-between items-center text-sm py-2">
                                    <span className="text-white">Deadpool & Wolverine (<span className="text-[#00F3FF]">Long</span>)</span>
                                    <span className="text-[#00F3FF]">+12.4%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-2">
                                    <span className="text-white">Dune: Part Two (<span className="text-[#00F3FF]">Long</span>)</span>
                                    <span className="text-[#E50914]">-2.1%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => alert('Rewards Claimed!')} className="w-full mt-6 py-3 rounded-xl border border-[#00F3FF] text-[#00F3FF] font-semibold hover:bg-[#00F3FF]/10 transition-colors">
                        Claim Rewards
                    </button>
                </div>

            </div>
        </section>
    );
}
