'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MintingModal } from '@/components/MintingModal';
import ApplicationModal from '@/components/ApplicationModal';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Play, CheckCircle2, ChevronRight, X, Send, Globe, Film, BadgeCheck, Flame, CornerUpLeft, SmilePlus, Star, ArrowUpRight } from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

const GRAPH_DATA = [
    { time: '09:00', value: 248.2 },
    { time: '09:02', value: 249.1 },
    { time: '09:04', value: 251.0 },
    { time: '09:06', value: 252.4 },
    { time: '09:08', value: 250.8 },
    { time: '09:10', value: 253.2 },
    { time: '09:12', value: 255.1 },
    { time: '09:14', value: 254.3 },
    { time: '09:15', value: 254.8 },
    { time: '09:18', value: 256.2 },
    { time: '09:20', value: 257.0 },
    { time: '09:22', value: 255.5 },
    { time: '09:24', value: 258.1 },
    { time: '09:26', value: 259.0 },
    { time: '09:28', value: 257.8 },
    { time: '09:30', value: 259.5 },
];

const REFERENCE_VALUE = 254;

export default function ProjectPage() {
    const [viewMode, setViewMode] = useState<'film' | 'graph'>('graph');
    const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
    const [tradeAmount, setTradeAmount] = useState('');
    const [sidebarTab, setSidebarTab] = useState<'depositors' | 'chat' | 'details'>('depositors');
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [showMintModal, setShowMintModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const depositors = [
        { rank: '4N9s4C...dTfQ', user: 'tau', badge: '👑', amount: '$154K', percentage: '51.4%' },
        { rank: 'HoXFd...xNkW', user: 'rhos', badge: '', amount: '$24K', percentage: '8.0%' },
        { rank: 'Xv4HR...X4f1', user: 'mx', badge: '', amount: '$14K', percentage: '4.8%' },
        { rank: 'BfXFd...bXNq', user: 'tau', badge: '', amount: '$7.8K', percentage: '2.6%' },
        { rank: 'GfBqy...Rbsv', user: 'sk', badge: '', amount: '$6.4K', percentage: '2.1%' },
        { rank: 'XWdfd...f3f9', user: 'mx', badge: '', amount: '$5K', percentage: '1.8%' },
        { rank: 'Rm4P9...wXw8', user: 'vk', badge: '', amount: '$2.4K', percentage: '0.8%' },
        { rank: 'QJ1f9...B4Hj', user: 'vk', badge: '', amount: '$995', percentage: '0.3%' },
        { rank: 'T8P4v...QGxs', user: 'sk', badge: '', amount: '$766', percentage: '0.2%' },
        { rank: 'B4PsH...Kjh9', user: 'gs', badge: '', amount: '$434', percentage: '0.1%' },
    ];

    const [chatInput, setChatInput] = useState('');
    const [chatActivities, setChatActivities] = useState([
        { id: 1, type: "message", initials: "DT", name: "Doug test", date: "Jan 24", text: "whats the issue ser?", replyTo: null, isAdmin: false },
        { id: 2, type: "message", initials: "AS", name: "Astral Storm", date: "Jan 25", text: "hello", replyTo: "star: hi", isAdmin: false },
        { id: 3, type: "message", initials: "D", name: "Doug", date: "Jan 26", text: "herro", replyTo: null, isAdmin: true },
        { id: 4, type: "deposit", text: "3HtRLA...qtiN deposited $9.91 at Tier 0 (Instant)" },
    ]);

    const handleSendMessage = () => {
        if (!chatInput.trim() || !isConnected) return;

        const newMessage = {
            id: Date.now(),
            type: "message",
            initials: "ME",
            name: "My Wallet",
            date: "Just now",
            text: chatInput.trim(),
            replyTo: null,
            isAdmin: false
        };

        setChatActivities(prev => [...prev, newMessage]);
        setChatInput('');
    };

    return (
        <main className="min-h-screen flex flex-col px-4 lg:px-8 py-2 w-full max-w-[1600px] mx-auto bg-slate-50/50">
            {/* Top Navbar */}
            <div className="mb-6 -mx-4 lg:-mx-8 border-b-0">
                <Navbar />
            </div>

            <div className="flex-1 w-full flex flex-col lg:flex-row gap-6">
                {/* Left Column (Main Project Stats) */}
                <div className="flex-1 min-w-0 flex flex-col gap-6">

                    {/* Main Hero & Header */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">

                        {/* Hero Image/Video */}
                        <div className="relative w-full aspect-video md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer bg-black/5">
                            {viewMode === 'film' && (
                                <>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                                        style={{ backgroundImage: `url("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJfdu01GP05dCCbubLMIXZgxz4SqKIpQx92wu9zHT7pXovv-Sn")` }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </>
                            )}

                            {/* Toolbar Top Left - overlaps graph */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                <button
                                    className="bg-white/90 backdrop-blur text-slate-800 p-2 rounded-lg shadow-sm hover:bg-white transition-colors"
                                    onClick={() => setViewMode('graph')}
                                >
                                    <Globe className="w-5 h-5" />
                                </button>
                                <button
                                    className="bg-white/90 backdrop-blur text-slate-800 p-2 rounded-lg shadow-sm hover:bg-white transition-colors"
                                    onClick={() => setViewMode('film')}
                                >
                                    <Film className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Center Content: Film view vs Graph view */}
                            {viewMode === 'film' ? (
                                <button className="absolute inset-0 m-auto w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105">
                                    <Play className="w-8 h-8 text-white fill-white ml-2" />
                                </button>
                            ) : (
                                <div className="absolute inset-0 rounded-2xl bg-slate-100 p-6 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            {/* <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Box Office Trajectory</p>
                                            <p className="text-2xl font-bold text-slate-900 mt-1">$184.2M</p> */}
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-400/30">
                                            +18.4% today
                                        </span>
                                    </div>
                                    <div className="flex-1 min-h-0 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={GRAPH_DATA}
                                                margin={{ top: 12, right: 28, left: 8, bottom: 4 }}
                                            >
                                                <defs>
                                                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.25)" />
                                                        <stop offset="100%" stopColor="rgba(34, 197, 94, 0.02)" />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="0" stroke="#e2e8f0" vertical={false} />
                                                <XAxis
                                                    dataKey="time"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fill: '#64748b' }}
                                                    dy={6}
                                                    interval="preserveStartEnd"
                                                />
                                                <YAxis
                                                    orientation="right"
                                                    domain={['dataMin - 2', 'dataMax + 2']}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 11, fill: '#475569' }}
                                                    dx={8}
                                                    tickFormatter={(v) => v.toFixed(1)}
                                                />
                                                <ReferenceLine
                                                    y={REFERENCE_VALUE}
                                                    stroke="#86efac"
                                                    strokeDasharray="4 4"
                                                    strokeWidth={1.5}
                                                />
                                                <Tooltip
                                                    cursor={{ stroke: '#22c55e', strokeWidth: 1.5, strokeDasharray: '0' }}
                                                    content={({ active, payload, label }) => {
                                                        if (!active || !payload?.length) return null;
                                                        return (
                                                            <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg border border-slate-200 px-3 py-2 text-center">
                                                                <p className="text-[10px] font-semibold text-slate-500 uppercase">{label}</p>
                                                                <p className="text-sm font-bold text-slate-900">{payload[0].value?.toFixed(1)}</p>
                                                            </div>
                                                        );
                                                    }}
                                                    position={{ y: 0 }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#2563eb"
                                                    strokeWidth={2}
                                                    fill="url(#areaFill)"
                                                    dot={false}
                                                    activeDot={{
                                                        r: 5,
                                                        fill: '#22c55e',
                                                        stroke: '#fff',
                                                        strokeWidth: 2,
                                                    }}
                                                    isAnimationActive={false}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Project Header Stats */}
                        <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">

                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                                    <div className="text-white font-bold text-4xl italic tracking-tighter">E</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Avatar the way of water</h1>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg whitespace-nowrap">
                                                <BadgeCheck size={14} className="text-blue-600" />
                                                Verified
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg whitespace-nowrap">
                                                <CheckCircle2 size={14} className="text-green-600" />
                                                Ownership Token
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 font-medium text-sm">Be part of the production. Back the next global phenomenon.</p>
                                    <div className="flex -space-x-3 mt-1">
                                        <img src="https://i.pravatar.cc/100?img=11" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                                        <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                                        <img src="https://i.pravatar.cc/100?img=13" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 md:gap-10 xl:pl-8 xl:border-l xl:border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ends In</span>
                                    <span className="text-2xl font-black text-slate-900">12:56</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Depositors</span>
                                    <span className="text-2xl font-black text-slate-900">35</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Raised</span>
                                    <span className="text-2xl font-black text-slate-900">$7.2K</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Deposit</span>
                                    <span className="text-2xl font-black text-slate-900">$205</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target</span>
                                    <span className="text-2xl font-black text-slate-900">300K</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Media Carousel Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-800">
                            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <h3 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-4">Our Teams</h3>
                                <div className="flex gap-4">
                                    <img src="https://i.pravatar.cc/100?img=5" className="w-12 h-12 rounded bg-white p-0.5 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=6" className="w-12 h-12 rounded bg-cyan-400 p-0.5 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=7" className="w-12 h-12 rounded bg-cyan-400 p-0.5 object-cover" />
                                    <img src="https://i.pravatar.cc/100?img=8" className="w-12 h-12 rounded bg-cyan-400 p-0.5 object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>

                        <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex items-center gap-1 -mt-2">
                        <button className="p-1 text-slate-400 hover:text-slate-800"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                        <div className="w-2 h-2 rounded-full bg-slate-800" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <button className="p-1 text-slate-400 hover:text-slate-800"><ChevronRight className="w-4 h-4" /></button>
                    </div>

                    {/* Project Details */}
                    <div className="bg-slate-100/60 rounded-3xl p-8 xl:p-10 flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-slate-900">Project Details</h2>
                        <div className="text-slate-600 space-y-4 text-sm font-medium leading-relaxed">
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Avatar &quot;The Way Of Water&quot;</h3>
                            <p>Be part of the production. Back the next global phenomenon.</p>

                            <div className="space-y-1">
                                <p>1. The Vision (Production Details):</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                                    <li>Status: Pre-Production / Funding Phase.</li>
                                    <li>Target Raise: 300,000 BNB (Alocated for high-end VFX and production).</li>
                                    <li>Minimum Goal: 50,000 BNB.</li>
                                    <li>The Mission: OwnAlpha connects major production houses with fans, allowing the community to fund blockbuster cinematic budgets directly.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <p>2. The IMO (Initial Movie Offering) Dashboard:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                                    <li>Current Progress: (Progress Bar showing % of BNB raised).</li>
                                    <li>Raise Model: 5-Day Uncapped Pro-Rata Sale.</li>
                                    <li>Investment Security: All BNB is held in a Smart Contract Escrow. If the minimum goal isn&apos;t met, you claim a 100% refund instantly on-chain.</li>
                                    <li>Asset Protection: Investors secure their contribution with a fraction of the movie&apos;s IP rights.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <p>3. Investor Benefits (MNFT Tiers):</p>
                                <p className="text-slate-500">Your Movie NFTs (MNFTs) represent &quot;Share Rights&quot; and fractional ownership:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                                    <li>Standard Tier: Pro-rata share of streaming & global box office earnings.</li>
                                    <li>Collector Tier: Own rare pre-production footage segments (e.g., a specific 10-minute action sequence).</li>
                                    <li>Alpha Tier: Premiere voting rights, set visitation passes, and prime VIP gold screen tags.</li>
                                </ul>
                            </div>

                            <div className="space-y-1">
                                <p>4. BNB Chain Ecosystem Integration:</p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                                    <li>Liquidity: Once the target is hit, 10% of raised BNB is paired with $ALPHA tokens to create unique trading pools for your MNFTs.</li>
                                    <li>Automated Yield: Revenue distributions are handled via automated monthly airdrops in BNB or $ALPHA.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="bg-white rounded-3xl p-8 xl:p-10 flex flex-col gap-8 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                <span className="w-3 h-3 bg-slate-400 rounded-sm" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">How it works</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">1</div>
                                <h3 className="text-lg font-bold text-slate-900">Raise</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Fund the next Blockbuster. Movie projects launch through an uncapped pro-rata sale defined by minimal targets. Fans and investors contribute BNB to fund the production. If the IMO doesn&apos;t hit its minimum funding goal, all platforms users claim a direct refund on the platform, ensuring zero-risk guarantees on production licensing.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">2</div>
                                <h3 className="text-lg font-bold text-slate-900">Trade</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Liquidity for Pop Culture. Once the target is hit, 20% of the raised funds are paired with project tokens and injected in our liquidity pool. Tokens are air-dropped to early owners within 24 hours, allowing you to trade your position immediately. Don&apos;t just watch the hype—trade it as the movie moves from production to the box office.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">3</div>
                                <h3 className="text-lg font-bold text-slate-900">Play NFT (VNFTs)</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Own a Piece of the Premiere. The remaining funds are protocol IP are governed by decentralized decision markets. This is where you buy and hold Movie NFTs (MNFTs) that represent a stake in the films success. As a holder, you receive automated monthly airdrops and can participate in proposals to trade or manage the project&apos;s assets within the platform.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Call to Action area, 2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#808080] text-white rounded-[20px] p-7 flex flex-col justify-between items-start h-[200px] relative overflow-hidden shadow-sm">
                            <h3 className="text-[26px] font-medium leading-snug relative z-10 tracking-tight">
                                Ready to be the<br />next Project?
                            </h3>
                            <button
                                onClick={() => setShowApplyModal(true)}
                                className="bg-[#1b65f6] hover:bg-[#1655cc] text-white font-medium py-3 px-5 rounded-[12px] flex items-center gap-2 transition-colors relative z-10 text-[14px]"
                            >
                                Apply now
                                <ArrowUpRight className="w-5 h-5 ml-0.5" strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-48">
                            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 self-end mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Upcoming Movies</h3>
                            <div className="w-12 h-2 bg-slate-100 rounded-full mt-2" />
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-3rem)]">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col p-4 flex-1 min-h-0">
                        {/* Tabs Toggle */}
                        <div className="bg-slate-50 rounded-2xl p-1.5 flex shadow-inner mb-6">
                            <button
                                onClick={() => setSidebarTab('depositors')}
                                className={`flex-1 font-bold rounded-xl py-2.5 text-sm flex items-center justify-center gap-2 transition-colors ${sidebarTab === 'depositors' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                                Depositors <span className="text-[10px] font-black">{depositors.length}</span>
                            </button>
                            <button
                                onClick={() => setSidebarTab('chat')}
                                className={`flex-1 font-bold rounded-xl py-2.5 text-sm transition-colors ${sidebarTab === 'chat' ? 'bg-[#e5e5e5] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                                Chat
                            </button>
                            <button
                                onClick={() => setSidebarTab('details')}
                                className={`flex-1 font-bold rounded-xl py-2.5 text-sm transition-colors ${sidebarTab === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                                Details
                            </button>
                        </div>

                        {sidebarTab === 'depositors' && (
                            <div className="flex flex-col flex-1 min-h-0">
                                {/* Section Header */}
                                <div className="px-2 mb-4 shrink-0">
                                    <h3 className="text-[12px] font-black tracking-widest flex items-center">
                                        <span className="text-blue-600">TOP 20</span>
                                        <span className="text-slate-200 font-medium mx-2 text-lg">/</span>
                                        <span className="text-slate-400 uppercase">NOTABLE</span>
                                        <span className="w-[18px] h-[18px] rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold ml-2">4</span>
                                    </h3>
                                </div>

                                {/* Depositors List */}
                                <div className="flex flex-col px-2 flex-1 gap-1 min-h-0 overflow-y-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {depositors.map((dep, i) => (
                                        <div key={i} className="flex items-center justify-between text-[15px] py-1.5 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-slate-500 min-w-[100px]">{dep.rank}</span>
                                                <span className="font-bold text-slate-700 min-w-[30px] flex items-center gap-1">
                                                    {dep.user}
                                                    {dep.badge && <span>{dep.badge}</span>}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-right">
                                                <span className="font-bold text-slate-900 w-12">{dep.amount}</span>
                                                <span className="font-bold text-slate-400 w-10 text-[11px]">{dep.percentage}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {sidebarTab === 'chat' && (
                            <div className="flex flex-col flex-1 min-h-0">
                                <div className="px-2 mb-4 shrink-0">
                                    <span className="inline-flex items-center gap-1.5 bg-[#dcfce7] text-[#16a34a] text-[10px] tracking-wider font-extrabold px-3 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
                                        2 ONLINE
                                    </span>
                                </div>

                                <div className="flex flex-col flex-1 gap-5 min-h-0 overflow-y-auto mb-4 pr-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {chatActivities.map((activity) => {
                                        if (activity.type === 'deposit') {
                                            return (
                                                <div key={activity.id} className="bg-[#eefcf4] p-3 rounded-2xl flex items-center gap-3 w-full border border-white/40 shadow-sm">
                                                    <div className="w-8 h-8 rounded-xl bg-[#c1f0d4] flex items-center justify-center shrink-0">
                                                        <Flame className="w-4 h-4 text-[#16a34a] fill-[#16a34a]" />
                                                    </div>
                                                    <p className="text-[#16a34a] text-sm font-semibold tracking-tight leading-tight">
                                                        {activity.text}
                                                    </p>
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={activity.id} className="flex gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-[#e5e5e5] flex items-center justify-center shrink-0 text-slate-800 font-bold text-sm">
                                                    {activity.initials}
                                                </div>
                                                <div className="flex flex-col py-0.5 flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-slate-900 text-[15px]">{activity.name}</span>
                                                        {activity.isAdmin && (
                                                            <div className="bg-[#ff5b00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                                                                <Star className="w-2.5 h-2.5 fill-white" />
                                                                ADMIN
                                                            </div>
                                                        )}
                                                        <span className="text-slate-400 text-xs font-bold ml-auto">{activity.date}</span>
                                                    </div>
                                                    {activity.replyTo && (
                                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-1">
                                                            <CornerUpLeft className="w-3.5 h-3.5" />
                                                            {activity.replyTo}
                                                        </div>
                                                    )}
                                                    <p className="text-slate-900 text-[15px] font-medium mb-3">{activity.text}</p>
                                                    <div className="flex gap-2">
                                                        <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors shadow-sm bg-white">
                                                            <CornerUpLeft className="w-4 h-4" />
                                                        </button>
                                                        <button className="h-8 px-3 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors gap-1 shadow-sm bg-white">
                                                            <SmilePlus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex items-center gap-2 mt-auto">
                                    <input
                                        type="text"
                                        disabled={!isConnected}
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSendMessage();
                                        }}
                                        placeholder={isConnected ? "Type a message..." : "Log in to chat"}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-300 shadow-sm text-slate-900 placeholder:text-slate-400 font-medium"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="w-12 h-12 rounded-xl bg-[#1863E1] flex items-center justify-center text-white shrink-0 hover:bg-[#1557c2] transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Send size={18} className="rotate-45 -translate-x-0.5 translate-y-0.5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {sidebarTab === 'details' && (
                            <div className="flex flex-col flex-1 min-h-0">
                                <h3 className="text-[13px] font-black text-slate-800 tracking-wider mb-5 uppercase shrink-0">
                                    TOKEN INFO
                                </h3>

                                <div className="flex flex-col flex-1 gap-3.5 min-h-0 overflow-y-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Created</span>
                                        <span className="text-slate-900 font-medium tracking-tight">Feb 19, 2026, 8:03 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Developer Wallet</span>
                                        <span className="text-slate-900 font-medium tracking-tight border-b-2 border-dotted border-slate-400">Ero7pY...oozu</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Contract</span>
                                        <span className="text-slate-900 font-medium tracking-tight border-b-2 border-dotted border-slate-400">BVAWx5...AFXs</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Vault</span>
                                        <span className="text-slate-900 font-medium tracking-tight border-b-2 border-dotted border-slate-400">BMYemF...KhHr</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Depositors</span>
                                        <span className="text-slate-900 font-medium tracking-tight">35</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-slate-500 font-medium tracking-tight">Top Contributor (82.6%)</span>
                                        <span className="text-slate-900 font-medium tracking-tight border-b-2 border-dotted border-slate-400">4N8AvD...qTBQ</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Trade Entry Block */}
                    <div className="bg-[#f0f0f0] rounded-[24px] p-5 flex flex-col shrink-0 gap-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.05)] border border-white/50">
                        {/* Input Area */}
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Amount"
                                value={tradeAmount}
                                onChange={(e) => setTradeAmount(e.target.value)}
                                className="flex-1 bg-white border border-slate-200/70 rounded-[18px] px-5 py-4 text-[17px] focus:outline-none focus:border-slate-300 shadow-sm text-slate-800 placeholder:text-slate-400 font-medium"
                            />
                            <button
                                onClick={() => setTradeAmount(tradeMode === 'sell' ? '12.5' : '100')}
                                className="px-5 rounded-[18px] bg-slate-200/80 hover:bg-slate-300/80 text-slate-900 font-bold transition-colors shadow-sm text-[15px]">
                                Max!
                            </button>
                        </div>

                        {/* Submit Button */}
                        {!isConnected ? (
                            <button
                                onClick={openConnectModal}
                                className="w-full bg-[#329b36] hover:bg-[#2c882f] text-white font-bold py-4 rounded-[18px] flex items-center justify-center gap-2 transition-transform shadow-[0_4px_14px_rgba(50,155,54,0.3)] text-[17px] tracking-wide"
                            >
                                Connect Wallet
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (!tradeAmount) return;
                                    if (tradeMode === 'buy') {
                                        setShowMintModal(true);
                                    } else {
                                        alert(`Selling ${tradeAmount} $AVATAR...`);
                                        setTradeAmount('');
                                    }
                                }}
                                className={`w-full text-white font-bold py-4 rounded-[18px] flex items-center justify-center gap-2 transition-transform shadow-[0_4px_14px_rgba(0,0,0,0.15)] text-[17px] tracking-wide ${tradeMode === 'buy' ? 'bg-[#329b36] hover:bg-[#2c882f]' : 'bg-[#e11d48] hover:bg-[#be123c]'}`}
                            >
                                {tradeMode === 'buy' ? 'Buy $AVATAR' : 'Sell $AVATAR'}
                            </button>
                        )}

                        {/* Trade Actions / Meta */}
                        <div className="flex items-center justify-between mt-0.5 px-0.5">
                            <div className="flex items-center bg-slate-200/70 p-1 rounded-xl shadow-inner">
                                <button
                                    onClick={() => setTradeMode('buy')}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${tradeMode === 'buy' ? 'bg-black text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    Buy
                                </button>
                                <button
                                    onClick={() => setTradeMode('sell')}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${tradeMode === 'sell' ? 'bg-black text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    Sell
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                                Balance {isConnected ? <><span className="text-slate-900 font-bold ml-0.5">2.4 BNB</span></> : <><span className="text-slate-900 font-bold ml-0.5">0 BNB</span></>}
                                <button className="hover:rotate-180 transition-transform duration-500 text-slate-600">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 22v-6h6" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-6 flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-6">
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

            {/* Modals */}
            {showApplyModal && (
                <ApplicationModal onClose={() => setShowApplyModal(false)} />
            )}
            {
                showMintModal && (
                    <MintingModal
                        movie={{
                            id: 'avatar',
                            title: 'Avatar the way of water',
                            poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop',
                            projectedRevenue: 184.2,
                            actualRevenue: 7.2,
                            progress: 18.4,
                            multiplier: 1.5
                        }}
                        onClose={() => setShowMintModal(false)}
                    />
                )
            }
        </main >
    );
}
