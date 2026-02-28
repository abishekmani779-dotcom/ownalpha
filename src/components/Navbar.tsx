import { Send, Moon, Grid, Mail, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export function Navbar() {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
                {/* Left icons */}
                <div className="flex items-center gap-6">
                    <button className="text-slate-800 hover:text-black transition-colors focus:outline-none">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                    <button className="text-slate-800 hover:text-black transition-colors focus:outline-none -ml-1">
                        <Send size={18} strokeWidth={2} className="rotate-45" />
                    </button>
                </div>

                {/* Center Pill */}
                <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm border border-slate-100 gap-6">
                    <Link href="/" className="flex items-center gap-2 pl-4 pr-2 hover:opacity-80 transition-opacity">
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">O</span>
                        </div>
                        <span className="text-sm font-bold tracking-tight text-slate-900 cursor-pointer">OwnAlpha</span>
                    </Link>

                    <div className="flex items-center gap-5 text-slate-500">
                        <button className="hover:text-slate-900 transition-colors">
                            <Moon size={16} strokeWidth={2.5} />
                        </button>
                        <button className="hover:text-slate-900 transition-colors">
                            <Grid size={16} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-[6px] rounded-full transition-colors leading-relaxed">
                    Apply
                </button> */}

                    <div className="flex items-center gap-2 pr-2">
                        <Link href="/producer">
                            <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                                Film Producer
                            </button>
                        </Link>


                    </div>
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-6">
                    <button className="text-slate-800 hover:text-black transition-colors focus:outline-none">
                        <Mail size={20} strokeWidth={2} />
                    </button>

                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button
                                                    onClick={openConnectModal}
                                                    type="button"
                                                    className="bg-slate-200/50 hover:bg-slate-200 text-slate-900 text-sm font-semibold px-4 py-2 rounded-xl transition-colors tracking-tight flex items-center gap-2"
                                                >
                                                    Connect Wallet
                                                </button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <button
                                                    onClick={openChainModal}
                                                    type="button"
                                                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors tracking-tight shadow-sm"
                                                >
                                                    Wrong network
                                                </button>
                                            );
                                        }

                                        return (
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                <button
                                                    onClick={openChainModal}
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    type="button"
                                                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold px-3 py-2 rounded-xl transition-colors tracking-tight"
                                                >
                                                    {chain.hasIcon && (
                                                        <div
                                                            style={{
                                                                background: chain.iconBackground,
                                                                width: 14,
                                                                height: 14,
                                                                borderRadius: 999,
                                                                overflow: 'hidden',
                                                                marginRight: 6,
                                                            }}
                                                        >
                                                            {chain.iconUrl && (
                                                                <img
                                                                    alt={chain.name ?? 'Chain icon'}
                                                                    src={chain.iconUrl}
                                                                    style={{ width: 14, height: 14 }}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {chain.name}
                                                </button>

                                                <button
                                                    onClick={openAccountModal}
                                                    type="button"
                                                    className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors tracking-tight shadow-sm"
                                                >
                                                    {account.displayName}
                                                    {account.displayBalance
                                                        ? ` (${account.displayBalance})`
                                                        : ''}
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </nav>
            {/* Spacer so content doesn't sit under fixed nav */}
            <div className="h-16 shrink-0" aria-hidden />
        </>
    );
}
