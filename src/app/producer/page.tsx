"use client";

import { useState } from "react";
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

export default function ProducerPage() {
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [targetRaise, setTargetRaise] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Please connect wallet");
      return;
    }

    if (!targetRaise || !tokenPrice || !duration || !totalSupply) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const txHash = await writeContractAsync({
        address: FACTORY_ADDRESS as `0x${string}`,
        abi: factoryAbi,
        functionName: "createMovie",
        args: [
          parseEther(targetRaise),
          parseEther(tokenPrice),
          BigInt(duration) * BigInt(86400),
          BigInt(totalSupply),
        ],
      });

      console.log("Transaction hash:", txHash);
      alert("Movie created successfully 🚀");

      setTargetRaise("");
      setTokenPrice("");
      setDuration("");
      setTotalSupply("");

    } catch (err: unknown) {
      console.error("Full Error:", err);
      const error = err as { shortMessage?: string; message?: string };
      alert(error?.shortMessage || error?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 pt-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
        >
          <h1 className="text-xl font-bold text-slate-900">
            Create Film Funding Contract
          </h1>

          <input
            type="number"
            placeholder="Target Raise (BNB)"
            className="w-full border p-3 rounded-lg"
            value={targetRaise}
            onChange={(e) => setTargetRaise(e.target.value)}
          />

          <input
            type="number"
            placeholder="Token Price (BNB)"
            className="w-full border p-3 rounded-lg"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Duration (days)"
            className="w-full border p-3 rounded-lg"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <input
            type="number"
            placeholder="Total Token Supply"
            className="w-full border p-3 rounded-lg"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Film"}
          </button>
        </form>
      </div>
    </>
  );
}