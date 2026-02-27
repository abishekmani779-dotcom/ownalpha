import { useState, useEffect } from 'react';

export interface BoxOfficeData {
    id: string;
    title: string;
    poster: string;
    projectedRevenue: number;
    actualRevenue: number;
    progress: number;
    multiplier: number;
}

export function useOracle() {
    const [data, setData] = useState<BoxOfficeData[]>([
        {
            id: '1',
            title: 'Deadpool & Wolverine',
            poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
            projectedRevenue: 850.5,
            actualRevenue: 840.2,
            progress: 98,
            multiplier: 1.2
        },
        {
            id: '2',
            title: 'Dune: Part Two',
            poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjcNsV.jpg',
            projectedRevenue: 700.0,
            actualRevenue: 711.0,
            progress: 101,
            multiplier: 1.5
        },
        {
            id: '3',
            title: 'Inside Out 2',
            poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
            projectedRevenue: 1000.0,
            actualRevenue: 980.5,
            progress: 98,
            multiplier: 1.1
        },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map(movie => {
                    const newActual = movie.actualRevenue + (Math.random() * 2 - 0.5); // Usually increasing
                    const newProgress = Math.min(150, Math.round((newActual / movie.projectedRevenue) * 100));
                    return {
                        ...movie,
                        actualRevenue: newActual,
                        progress: newProgress,
                    };
                })
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return data;
}
