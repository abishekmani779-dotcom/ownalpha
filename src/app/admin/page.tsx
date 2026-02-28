"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { Navbar } from "@/components/Navbar";

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

    // Per-proposal transient state for token specifics
    const [tokenPrices, setTokenPrices] = useState<Record<string, string>>({});
    const [totalSupplies, setTotalSupplies] = useState<Record<string, string>>({});
    const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const stored = localStorage.getItem('ownalpha_proposals');
        if (stored) {
            setProposals(JSON.parse(stored));
        }
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
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin / Producer Dashboard</h1>
                    <p className="text-slate-500">Review community submitted proposals and deploy Smart Contracts directly to Metis.</p>
                </div>

                {proposals.length === 0 ? (
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
                )}
            </div>
        </main>
    );
}
