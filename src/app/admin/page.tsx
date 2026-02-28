"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { Navbar } from "@/components/Navbar";
import movieFundingAbi from "@/abi/MovieFunding.json";
import factoryJson from "@/abi/MovieFactory.json";

const FACTORY_ADDRESS =
    "0x0B590C15064DfDB862B1b0062F6A303Eb2BE6D7a" as `0x${string}`;

const factoryAbi = [
    {
        name: "createMovie",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "_targetRaise", type: "uint256" },
            { name: "_tokenPrice", type: "uint256" },
            { name: "_duration", type: "uint256" },
            { name: "_totalTokenSupply", type: "uint256" },
        ],
        outputs: [],
    },
];

interface Proposal {
    id: string;
    title: string;
    cost: string; // Used as target raise
    duration: string;
    pitchDeck: string;
    visualProof: string;
    ticker: string;
    status: string;
    date: string;
}

export default function AdminPage() {
    const { isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [investments, setInvestments] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'proposals' | 'investments' | 'revenue'>('proposals');

    const { data: movies, isLoading: isMoviesLoading } = useReadContract({
        address: FACTORY_ADDRESS,
        abi: factoryJson.abi,
        functionName: "getAllMovies",
    });
    const deployedAddresses = (movies as string[]) || [];

    const [revenueAmounts, setRevenueAmounts] = useState<Record<string, string>>({});
    const [isDepositing, setIsDepositing] = useState<Record<string, boolean>>({});

    const handleDepositRevenue = async (address: string) => {
        const amt = revenueAmounts[address];
        if (!amt || !isConnected) return;

        try {
            setIsDepositing(prev => ({ ...prev, [address]: true }));
            const txHash = await writeContractAsync({
                address: address as `0x${string}`,
                abi: movieFundingAbi.abi,
                functionName: "depositRevenue",
                value: parseEther(amt),
            });
            console.log("Revenue deposited:", txHash);
            alert(`Successfully deposited ${amt} BNB revenue! The contract has automatically distributed 75% to your wallet and unlocked 25% for investors.`);
            setRevenueAmounts(prev => ({ ...prev, [address]: '' }));
        } catch (err: any) {
            console.error(err);
            alert(err?.shortMessage || err?.message || "Failed to deposit revenue");
        } finally {
            setIsDepositing(prev => ({ ...prev, [address]: false }));
        }
    };

    // Per-proposal transient state for token specifics
    const [tokenPrices, setTokenPrices] = useState<Record<string, string>>({});
    const [totalSupplies, setTotalSupplies] = useState<Record<string, string>>({});
    const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const stored = localStorage.getItem('ownalpha_proposals');
        if (stored) {
            setProposals(JSON.parse(stored));
        }

        async function fetchInvestments() {
            try {
                const res = await fetch('/api/investments');
                if (res.ok) {
                    setInvestments(await res.json());
                }
            } catch (err) {
                console.error("Failed to fetch investments", err);
            }
        }
        fetchInvestments();
    }, []);

    const handleDeploy = async (proposal: Proposal) => {
        if (!isConnected) {
            alert("Please connect wallet");
            return;
        }

        const price = tokenPrices[proposal.id];
        const supply = totalSupplies[proposal.id];

        if (!price || !supply) {
            alert("Please provide Token Price and Total Supply before deploying.");
            return;
        }

        try {
            setLoadingIds(prev => ({ ...prev, [proposal.id]: true }));

            const txHash = await writeContractAsync({
                address: FACTORY_ADDRESS,
                abi: factoryAbi,
                functionName: "createMovie",
                args: [
                    parseEther(proposal.cost),
                    parseEther(price),
                    BigInt(proposal.duration) * BigInt(86400),
                    BigInt(supply),
                ],
            });

            console.log("Transaction hash:", txHash);
            alert(`Movie contract for ${proposal.title} deployed successfully! 🚀`);

            // Optionally update status in local storage to 'deployed'
            const updated = proposals.map(p =>
                p.id === proposal.id ? { ...p, status: 'deployed' } : p
            );
            setProposals(updated);
            localStorage.setItem('ownalpha_proposals', JSON.stringify(updated));

        } catch (err: unknown) {
            console.error("Full Error:", err);
            const error = err as { shortMessage?: string; message?: string };
            alert(error?.shortMessage || error?.message || "Transaction failed");
        } finally {
            setLoadingIds(prev => ({ ...prev, [proposal.id]: false }));
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin / Producer Dashboard</h1>
                        <p className="text-slate-500">Review community submitted proposals, deploy contracts, and track investors.</p>
                    </div>
                    <div className="flex bg-slate-200 p-1 rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('proposals')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'proposals' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Proposals
                        </button>
                        <button
                            onClick={() => setActiveTab('investments')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'investments' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Investments
                        </button>
                        <button
                            onClick={() => setActiveTab('revenue')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'revenue' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Revenue
                        </button>
                    </div>
                </div>

                {activeTab === 'proposals' ? (
                    proposals.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">No Proposals Found</h3>
                            <p className="text-slate-500 text-sm">When users submit the application form, they will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {proposals.map(proposal => (
                                <div key={proposal.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                    <div className="p-6 border-b border-slate-100 relative">
                                        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${proposal.status === 'deployed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {proposal.status.toUpperCase()}
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 pr-20 line-clamp-1">{proposal.title}</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs font-bold bg-[#131823] text-white px-2 py-1 rounded-md">{proposal.ticker}</span>
                                            <span className="text-xs text-slate-400 font-medium">{proposal.date}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4 flex-1">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-50 rounded-xl p-3">
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Raise</p>
                                                <p className="font-semibold text-slate-900">{proposal.cost} USDC</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-xl p-3">
                                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                                                <p className="font-semibold text-slate-900">{proposal.duration} days</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {proposal.pitchDeck && (
                                                <a href={proposal.pitchDeck} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                                    <span>📄</span> View Pitch Deck
                                                </a>
                                            )}
                                            {proposal.visualProof && (
                                                <a href={proposal.visualProof} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                                    <span>🎬</span> View Visual Proof
                                                </a>
                                            )}
                                        </div>

                                        {proposal.status !== 'deployed' && (
                                            <div className="pt-4 border-t border-slate-100 space-y-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 block mb-1">Token Price (BNB)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 0.01"
                                                        value={tokenPrices[proposal.id] || ''}
                                                        onChange={(e) => setTokenPrices(prev => ({ ...prev, [proposal.id]: e.target.value }))}
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 block mb-1">Total Token Supply</label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 1000000"
                                                        value={totalSupplies[proposal.id] || ''}
                                                        onChange={(e) => setTotalSupplies(prev => ({ ...prev, [proposal.id]: e.target.value }))}
                                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                                        <button
                                            onClick={() => handleDeploy(proposal)}
                                            disabled={loadingIds[proposal.id] || proposal.status === 'deployed'}
                                            className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
                                        >
                                            {loadingIds[proposal.id]
                                                ? "Deploying..."
                                                : proposal.status === 'deployed'
                                                    ? "Deployed"
                                                    : "Deploy Contract"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : activeTab === 'investments' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold">Investor Address</th>
                                        <th className="p-4 font-semibold">Movie Slug</th>
                                        <th className="p-4 font-semibold">Amount (BNB)</th>
                                        <th className="p-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investments.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500">No investments recorded yet.</td>
                                        </tr>
                                    ) : (
                                        investments.map((inv, idx) => (
                                            <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <td className="p-4 text-sm text-slate-600">
                                                    {new Date(inv.createdAt || Date.now()).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-sm font-medium text-slate-900">
                                                    {inv.investorAddress.slice(0, 6)}...{inv.investorAddress.slice(-4)}
                                                </td>
                                                <td className="p-4 text-sm text-slate-600">
                                                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{inv.movieSlug}</span>
                                                </td>
                                                <td className="p-4 text-sm font-bold text-green-600">
                                                    {inv.amount}
                                                </td>
                                                <td className="p-4 text-sm">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Confirmed</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Distribute Box Office Revenue</h2>
                            <p className="text-slate-500 text-sm mt-1">Select a deployed movie contract, input the revenue generated, and dispatch the funds on-chain. The smart contract automatically executes the 75%/25% split.</p>
                        </div>

                        {isMoviesLoading ? (
                            <div className="py-10 text-center text-slate-500">Loading contracts...</div>
                        ) : deployedAddresses.length === 0 ? (
                            <div className="py-10 text-center text-slate-500">No active movie contracts found.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {deployedAddresses.map((addr) => (
                                    <div key={addr} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Deployed Contract</div>
                                            <div className="font-mono text-slate-800 font-semibold mb-4">{addr}</div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 block mb-1">Box Office Revenue (BNB)</label>
                                                <input
                                                    type="number"
                                                    placeholder="100.0"
                                                    value={revenueAmounts[addr] || ''}
                                                    onChange={(e) => setRevenueAmounts(prev => ({ ...prev, [addr]: e.target.value }))}
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDepositRevenue(addr)}
                                                disabled={!revenueAmounts[addr] || isDepositing[addr]}
                                                className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
                                            >
                                                {isDepositing[addr] ? 'Distributing...' : 'Deposit to Smart Contract'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
