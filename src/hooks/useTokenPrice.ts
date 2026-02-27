import { useEffect, useState } from 'react';

interface TokenPriceState {
    price: number | null;
    change24h: number | null;
    marketCap: number | null;
    loading: boolean;
    error: string | null;
}

function randomInRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function useTokenPrice(_coingeckoId?: string, _vsCurrency: string = 'usd'): TokenPriceState {
    const [state, setState] = useState<TokenPriceState>(() => {
        const price = randomInRange(0.05, 0.15);
        const change24h = randomInRange(-15, 25);
        const marketCap = randomInRange(200_000, 500_000);
        return {
            price,
            change24h,
            marketCap,
            loading: false,
            error: null,
        };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setState((prev) => {
                const price = prev.price ?? 0.1;
                const wiggle = randomInRange(-0.002, 0.002);
                const newPrice = Math.max(0.001, price + wiggle);
                const change24h = randomInRange(-20, 30);
                const marketCap = randomInRange(150_000, 600_000);
                return {
                    price: newPrice,
                    change24h,
                    marketCap,
                    loading: false,
                    error: null,
                };
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return state;
}
