'use client';

import { createChart, ColorType, CandlestickData, Time, CandlestickSeries } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const CandlestickChart = (props: {
    data: CandlestickData<Time>[];
    colors?: {
        backgroundColor?: string;
        textColor?: string;
    };
}) => {
    const {
        data,
        colors: {
            backgroundColor = 'transparent',
            textColor = '#64748b',
        } = {},
    } = props;

    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { color: '#e2e8f0', style: 1 },
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
                timeVisible: true,
                secondsVisible: false,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#22c55e',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#22c55e',
            wickDownColor: '#ef4444',
        });

        candlestickSeries.setData(data);

        candlestickSeries.createPriceLine({
            price: 254.0,
            color: '#86efac',
            lineWidth: 2,
            lineStyle: 2, // Dashed
            axisLabelVisible: true,
            title: 'Base',
        });

        window.addEventListener('resize', handleResize);

        chart.timeScale().fitContent();

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, backgroundColor, textColor]);

    return (
        <div ref={chartContainerRef} className="w-full h-full" />
    );
};
