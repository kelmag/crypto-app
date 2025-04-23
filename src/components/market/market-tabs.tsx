import * as React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '@/components/ui';

import { MarketCard } from './market-card';

type Tab = {
  id: string;
  title: string;
};

const TABS: Tab[] = [
  { id: 'featured', title: '⭐ Featured' },
  { id: 'gainers', title: '🚀 Top Gainers' },
  { id: 'losers', title: '🔻 Top Losers' },
];

function generateChartData(
  basePrice: number,
  volatility: number,
  changePercent?: number
) {
  const data = [];
  let price = basePrice;

  // If changePercent is provided, we'll create a trend in that direction
  const trend = changePercent ? changePercent / 24 : 0;

  // Start with a slightly lower price if change is positive, or higher if negative
  // This makes the chart show the proper trend direction
  if (changePercent) {
    price =
      changePercent > 0
        ? basePrice * (1 - (changePercent * 0.5) / 100)
        : basePrice * (1 - (changePercent * 0.5) / 100);
  }

  for (let i = 0; i < 24; i++) {
    // Add trend component plus random walk
    const randomWalk = (Math.random() - 0.5) * volatility * price;
    const trendComponent = price * (trend / 100);
    price = price + trendComponent + randomWalk;

    data.push({
      timestamp: `${i}h`,
      price: Math.max(0.01, price), // Ensure price doesn't go below 0.01
    });
  }

  // Ensure the last price matches the expected end price based on change percent
  if (changePercent) {
    data[data.length - 1].price = basePrice;
  }

  return data;
}

// Mock data for demonstration
const MOCK_DATA = {
  featured: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 159234.23,
      change: 5.42,
      chartData: generateChartData(159234.23, 0.02, 5.42),
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      price: 574.23,
      change: -8.5,
      chartData: generateChartData(574.23, 0.03, -8.5),
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 138.74,
      change: 7.25,
      chartData: generateChartData(138.74, 0.03, 7.25),
    },
  ],
  gainers: [
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 138.74,
      change: 15.2,
      chartData: generateChartData(138.74, 0.04, 15.2),
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      price: 674.23,
      change: 12.1,
      chartData: generateChartData(674.23, 0.035, 12.1),
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3521.87,
      change: 8.7,
      chartData: generateChartData(3521.87, 0.025, 8.7),
    },
  ],
  losers: [
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      price: 574.23,
      change: -8.5,
      chartData: generateChartData(574.23, 0.03, -8.5),
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3216.45,
      change: -5.2,
      chartData: generateChartData(3216.45, 0.025, -5.2),
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 120.32,
      change: -3.1,
      chartData: generateChartData(120.32, 0.02, -3.1),
    },
  ],
};

type Props = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export function MarketTabs({ activeTab, onTabChange }: Props) {
  const activeData = MOCK_DATA[activeTab as keyof typeof MOCK_DATA] || [];

  return (
    <View className="pb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TabItem
              key={tab.id}
              title={tab.title}
              isActive={isActive}
              onPress={() => onTabChange(tab.id)}
            />
          );
        })}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row p-4">
          {activeData.map((item) => (
            <MarketCard key={item.symbol} {...item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

type TabItemProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

function TabItem({ title, isActive, onPress }: TabItemProps) {
  return (
    <View className="">
      <Text
        onPress={onPress}
        className={`px-6 py-3 text-lg ${
          isActive ? 'text-primary-500' : 'text-neutral-500'
        }`}
      >
        {title}
      </Text>
      <View
        className={`h-px ${isActive ? 'bg-primary-500' : 'bg-neutral-500'}`}
      />
    </View>
  );
}
