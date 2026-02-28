const fs = require('fs');
const file = fs.readFileSync('src/app/project/[slug]/page.tsx', 'utf8');

const returnIndex = file.indexOf('    return (\n');
const topBlock = file.slice(0, returnIndex);

const oldChatBlockStart = file.indexOf("{sidebarTab === 'chat' && (");
const oldChatBlockEnd = file.indexOf("                        {sidebarTab === 'details' && (");
const oldChatContent = file.slice(oldChatBlockStart, oldChatBlockEnd);

// A slightly adjusted oldChatContent so it fits the new style
let chatContentStr = oldChatContent.replace(/<div className="flex flex-col flex-1 min-h-0">/, `<div className="flex flex-col flex-1 min-h-0 px-2 py-2">`);
chatContentStr = chatContentStr.replace(/px-2 mb-4 shrink-0/, `mb-3 shrink-0`);
chatContentStr = chatContentStr.replace(/rounded-xl bg-\[#1863E1\]/g, `rounded-[12px] bg-blue-600`);

const newJSX = `    return (
        <main className="min-h-screen flex flex-col px-4 lg:px-6 py-2 w-full max-w-[1500px] mx-auto bg-[#eff0f4] font-sans">
            {/* Top Navbar */}
            <div className="mb-4">
                <Navbar />
            </div>

            {/* 1. HERO SECTION (Full Width) */}
            <div className="w-full relative h-[250px] md:h-[300px] rounded-[24px] overflow-hidden mb-5 flex items-end shadow-sm border-[4px] border-white bg-slate-900">
                {/* Background Image that looks like the movie */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: \`url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop")\` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* The White Overlay Info Box at the bottom (as in the screenshot) */}
                <div className="relative z-10 w-full bg-white mx-3 mb-3 md:mx-4 md:mb-4 rounded-[16px] p-3 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm border border-slate-100/50 backdrop-blur-md">
                    {/* Left Side: Avatar, Title, verification tags */}
                    <div className="flex items-center gap-4">
                        <div className="w-[80px] h-[80px] bg-black rounded-xl flex flex-col items-center justify-center text-white font-bold text-5xl italic tracking-tighter shrink-0">E</div>
                        <div className="flex flex-col gap-1.5">
                            {/* Title and tags */}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                                <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-none">Avatar the way of water</h1>
                                <div className="flex items-center gap-1.5 mt-1 md:mt-0">
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100/50">
                                        <BadgeCheck size={12} className="text-blue-500" /> Verified
                                    </span>
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100/50">
                                        <CheckCircle2 size={12} className="text-emerald-500" /> Ownership Token
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-500 font-medium text-[12px] tracking-tight">Be part of the production. Back the next global phenomenon.</p>
                            <div className="flex -space-x-2 mt-1">
                                <img src="https://i.pravatar.cc/100?img=11" className="w-5 h-5 rounded-full border border-white bg-slate-100" />
                                <img src="https://i.pravatar.cc/100?img=12" className="w-5 h-5 rounded-full border border-white bg-slate-100" />
                                <img src="https://i.pravatar.cc/100?img=13" className="w-5 h-5 rounded-full border border-white bg-slate-100" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Stats (Ends in, Depositors, etc) */}
                    <div className="flex items-center gap-5 md:gap-8 px-2 md:px-4 mt-4 md:mt-0 ml-auto md:ml-0">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5 tracking-tight">Ends in</span>
                            <span className="text-[14px] font-medium text-slate-900 leading-none">12:56</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5 tracking-tight">Depositors</span>
                            <span className="text-[14px] font-medium text-slate-900 leading-none">35</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5 tracking-tight">Raised</span>
                            <span className="text-[14px] font-medium text-slate-900 leading-none">$7.2K</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5 tracking-tight">Avg. Deposit</span>
                            <span className="text-[14px] font-medium text-slate-900 leading-none">$205</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5 tracking-tight">Target</span>
                            <span className="text-[14px] font-medium text-slate-900 leading-none">300K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN LAYOUT (Left Sidebar + NFT Grid) */}
            <div className="flex flex-col lg:flex-row gap-5">
                
                {/* 2a. LEFT SIDEBAR */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
                     
                     {/* The Tabs + List block */}
                     <div className="bg-[#f0f0f5]/80 rounded-[16px] border border-white shadow-sm flex flex-col p-2 h-[400px]">
                         
                         {/* Tabs Toggle */}
                         <div className="bg-white rounded-[12px] p-1 flex shadow-sm mb-3">
                             <button
                                 onClick={() => setSidebarTab('depositors')}
                                 className={\`flex-1 font-semibold rounded-[10px] py-1.5 text-[11px] transition-colors flex justify-center items-center gap-1.5 \${sidebarTab === 'depositors' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>
                                 Depositors <span className="text-[8px] bg-slate-200 px-1 py-0.5 rounded uppercase font-bold text-slate-600">35</span>
                             </button>
                             <button
                                 onClick={() => setSidebarTab('chat')}
                                 className={\`flex-1 font-semibold rounded-[10px] py-1.5 text-[11px] transition-colors \${sidebarTab === 'chat' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>
                                 Chat
                             </button>
                             <button
                                 onClick={() => setSidebarTab('details')}
                                 className={\`flex-1 font-semibold rounded-[10px] py-1.5 text-[11px] transition-colors \${sidebarTab === 'details' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}\`}>
                                 Details
                             </button>
                         </div>

                         {/* CONTENT TABS */}
                         {sidebarTab === 'depositors' && (
                             <div className="flex flex-col flex-1 min-h-0 px-1">
                                 {/* Section Header */}
                                 <div className="mb-2 shrink-0">
                                     <h3 className="text-[9px] font-bold tracking-widest flex items-center">
                                         <span className="text-blue-600">TOP 20</span>
                                         <span className="text-slate-300 font-medium mx-1 text-sm">/</span>
                                         <span className="text-slate-400">NOTABLE</span>
                                         <span className="w-3.5 h-3.5 rounded bg-slate-200 flex items-center justify-center text-[8px] text-slate-500 font-bold ml-1.5">4</span>
                                     </h3>
                                 </div>
                                 {/* Depositors List */}
                                 <div className="flex flex-col flex-1 gap-0.5 min-h-0 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                     {depositors.map((dep, i) => (
                                         <div key={i} className="flex items-center justify-between text-[11px] py-1.5 hover:bg-slate-200/50 rounded-lg px-2 -mx-1 transition-colors cursor-pointer group">
                                             <div className="flex items-center gap-2">
                                                 <span className="font-semibold text-slate-800 min-w-[75px]">{dep.rank}</span>
                                                 <span className="font-bold text-slate-500 min-w-[20px] flex items-center gap-1 bg-white border border-slate-200/50 px-1 py-0.5 rounded text-[8px]">
                                                     {dep.user}
                                                     {dep.badge && <span>{dep.badge}</span>}
                                                 </span>
                                             </div>
                                             <div className="flex items-center gap-2 text-right">
                                                 <span className="font-bold text-slate-900 w-10">{dep.amount}</span>
                                                 <span className="font-bold text-blue-500 w-8 text-[9px]">{dep.percentage}</span>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}

${chatContentStr}

                         {sidebarTab === 'details' && (
                             <div className="flex flex-col flex-1 min-h-0 text-xs p-4 text-slate-600">
                                 Tokenomics data goes here...
                             </div>
                         )}
                     </div>
                     
                     {/* Trade Entry Block */}
                     <div className="bg-white rounded-[16px] p-2.5 flex flex-col shadow-sm border border-slate-200/60">
                         {/* Input Area */}
                         <div className="flex gap-2 mb-2.5">
                             <input
                                 type="text"
                                 placeholder="Amount"
                                 value={tradeAmount}
                                 onChange={(e) => setTradeAmount(e.target.value)}
                                 className="flex-1 bg-slate-50 border border-slate-100 rounded-[10px] px-3 py-2 text-[13px] focus:outline-none focus:border-blue-300 shadow-sm text-slate-800 placeholder:text-slate-400 font-medium"
                             />
                             <button
                                 onClick={() => setTradeAmount(tradeMode === 'sell' ? '12.5' : '100')}
                                 className="px-3 rounded-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors shadow-sm text-[11px]">
                                 Max!
                             </button>
                         </div>
                         {/* Submit Button */}
                         <button
                             onClick={() => {
                                 if (!tradeAmount && isConnected) return;
                                 if (!isConnected) openConnectModal?.();
                                 else {
                                      if (tradeMode === 'buy') setShowMintModal(true);
                                      else alert(\`Selling \${tradeAmount} $AVATAR...\`);
                                 }
                             }}
                             className={\`w-full text-white font-bold py-2.5 rounded-[10px] flex items-center justify-center transition-transform shadow-sm text-[12px] tracking-wide \${!isConnected ? 'bg-blue-600 hover:bg-blue-700' : (tradeMode === 'buy' ? 'bg-[#2ea838] hover:bg-[#278d2f]' : 'bg-[#18181b] hover:bg-black')}\`}
                         >
                             {!isConnected ? 'Connect Wallet' : (tradeMode === 'buy' ? 'Buy $AVATAR' : 'Sell $AVATAR')}
                         </button>
                         {/* Trade Actions / Meta */}
                         <div className="flex items-center justify-between mt-2.5 px-0.5">
                             <div className="flex items-center bg-black rounded-lg p-0.5 shadow-sm">
                                 <button
                                     onClick={() => setTradeMode('buy')}
                                     className={\`px-2 py-0.5 rounded-[6px] text-[9px] font-bold transition-colors \${tradeMode === 'buy' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}\`}>
                                     Buy
                                 </button>
                                 <button
                                     onClick={() => setTradeMode('sell')}
                                     className={\`px-2 py-0.5 rounded-[6px] text-[9px] font-bold transition-colors \${tradeMode === 'sell' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}\`}>
                                     Sell
                                 </button>
                             </div>
                             <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[10px]">
                                 Balance {isConnected ? <><span className="text-slate-900 font-bold">2.4 BNB</span></> : <><span className="text-slate-900 font-bold">0 BNB</span></>}
                                 <button className="text-slate-400 hover:text-slate-800"><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 22v-6h6" /></svg></button>
                             </div>
                         </div>
                     </div>
                </div>

                {/* 2b. RIGHT NFT GRID */}
                <div className="flex-1 w-full min-w-0 bg-white border border-slate-200/60 rounded-[20px] shadow-sm p-4 h-[560px] overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         {[
                             { id: 1, title: 'Darkness Ablaze #143/189 Sala...', price: '3.15', lastSale: '3.14', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 2, title: 'Astral Radiance #165/189 Hea...', price: '3.15', lastSale: '2.80', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 3, title: 'Surging Sparks #180/191 Flam...', price: '3.15', lastSale: '3.00', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 4, title: 'Paldea Evolved #243/193 Ting...', price: '3.21', lastSale: '3.23', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 5, title: 'Darkness Ablaze #143/189 Sala...', price: '3.15', lastSale: '3.14', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 6, title: 'Astral Radiance #165/189 Hea...', price: '3.15', lastSale: '2.80', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 7, title: 'Surging Sparks #180/191 Flam...', price: '3.15', lastSale: '3.00', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                             { id: 8, title: 'Paldea Evolved #243/193 Ting...', price: '3.21', lastSale: '3.23', img: 'https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=400&auto=format&fit=crop' },
                         ].map(nft => (
                             <div key={nft.id} className="flex flex-col bg-white rounded-[14px] overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                 <div className="bg-gradient-to-b from-slate-700 to-black p-2 h-[180px] flex items-center justify-center">
                                     <img src={nft.img} className="w-[110px] h-[150px] object-cover rounded shadow-md border border-white/20 hover:scale-105 transition-transform" alt={nft.title} />
                                 </div>
                                 <div className="p-3">
                                     <h4 className="text-[10px] font-bold text-slate-800 truncate mb-1.5">{nft.title}</h4>
                                     <div className="flex items-center gap-1 mb-1">
                                         <span className="text-[11px] font-bold font-mono text-slate-900">{nft.price}</span>
                                         <span className="text-[9px] text-slate-500 font-bold">USDC</span>
                                         <BadgeCheck size={11} className="text-slate-400 ml-0.5" />
                                     </div>
                                     <div className="text-[9px] text-slate-400 font-medium">
                                         Last sale <span className="text-slate-500 font-bold">{nft.lastSale}</span> USDC
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>

            {/* 3. BOTTOM CARDS (Full Width aligned with above layout) */}
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <div className="flex-[2] bg-[#7d7e82] text-white rounded-[20px] p-6 lg:p-8 flex flex-col justify-between items-start h-[160px] relative overflow-hidden shadow-sm">
                    <h3 className="text-[24px] font-medium leading-tight relative z-10 tracking-tight">
                        Ready to be the<br />next Project?
                    </h3>
                    <button
                        onClick={() => setShowApplyModal(true)}
                        className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-[10px] flex items-center gap-1.5 transition-colors relative z-10 text-[13px]"
                    >
                        Apply now
                        <ArrowUpRight className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
                    </button>
                </div>
                <div className="flex-1 bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60 flex flex-col justify-between h-[160px]">
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 self-end mb-2">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold text-slate-900">Upcoming Movies</h3>
                        <div className="w-8 h-1 bg-slate-200 rounded-full mt-2" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <span className="flex items-center gap-1.5">
                        <Globe size={11} />
                        BNB: <span className="text-slate-700">$87.23</span>
                    </span>
                    <span className="hover:text-slate-700 cursor-pointer transition-colors">Support</span>
                    <span className="hover:text-slate-700 cursor-pointer transition-colors">Founders</span>
                </div>
                <div className="flex items-center gap-6">
                    <span className="hover:text-slate-700 cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-slate-700 cursor-pointer transition-colors">Terms of Service</span>
                </div>
            </footer>

            {/* Modals */}
            {showApplyModal && (
                <ApplicationModal onClose={() => setShowApplyModal(false)} />
            )}
            {showMintModal && (
                <MintingModal
                    movie={{
                        id: 'avatar',
                        title: 'Avatar the way of water',
                        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
                        projectedRevenue: 184.2,
                        actualRevenue: 7.2,
                        progress: 18.4,
                        multiplier: 1.5
                    }}
                    onClose={() => setShowMintModal(false)}
                />
            )}
        </main >
    );
}
`;

fs.writeFileSync('src/app/project/[slug]/page.tsx', topBlock + newJSX);
