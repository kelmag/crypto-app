import React from 'react';

import { type Coin } from '@/api/types';
import { CoinCard } from '@/components/market/coin-card';
import { generateChartData } from '@/components/market/market-tabs';

export function CoinItem({ item }: { item: Coin }) {
  // Create chart data in the correct format
  const chartData = item.sparkline
    ? item.sparkline.map((price: number, index: number) => ({
        timestamp: new Date(Date.now() - (24 - index) * 3600000).toISOString(),
        price,
      }))
    : generateChartData(item.currentPrice, 0.02, item.priceChangePercentage24h);

  return (
    <CoinCard
      key={item.id}
      symbol={item.symbol.toUpperCase()}
      name={item.name}
      image={item.image}
      price={item.currentPrice}
      change={item.priceChangePercentage24h}
      chartData={chartData}
      size="lg"
    />
  );
}
