"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Film, ArrowBigRightDash, Layers, Briefcase, ChevronRight } from "lucide-react";
import factoryJson from "@/abi/MovieFactory.json";

const FACTORY_ADDRESS = "0x0B590C15064DfDB862B1b0062F6A303Eb2BE6D7a" as `0x${string}`;

export default function InvestPage() {
  const { data: movies, isLoading } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryJson.abi,
    functionName: "getAllMovies",
  });

  const deployedAddresses = (movies as string[]) || [];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Active Funding Contracts</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Select an active <span className="font-semibold text-blue-600">MovieFunding</span> smart contract below to instantly launch the secure on-chain trading terminal.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : deployedAddresses.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-200 flex flex-col items-center">
            <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Smart Contracts Found</h3>
            <p className="text-slate-500">Contact the admin or producer to deploy a new Movie Funding contract to the blockchain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deployedAddresses.map((address, idx) => (
              <Link href={`/investor/${address}`} key={address}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden flex flex-col"
                >
                  <div className="bg-slate-900 p-6 flex items-center gap-4 text-white">
                    <div className="bg-blue-600/20 p-3 rounded-full border border-blue-500/30 group-hover:bg-blue-600 group-hover:border-blue-400 transition-colors">
                      <Layers className="w-6 h-6 text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Deployed Contract</div>
                      <h2 className="text-lg font-bold tracking-tight">MovieFunding #{idx + 1}</h2>
                    </div>
                  </div>
                  <div className="p-6 flex-1 space-y-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Contract Address</p>
                      <div className="bg-slate-100 p-3 rounded-xl border border-slate-200/50 flex items-center justify-between">
                        <code className="text-sm font-semibold text-slate-700">
                          {address.slice(0, 8)}...{address.slice(-6)}
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700">Open Terminal</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

