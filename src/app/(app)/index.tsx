import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { MarketCard } from '@/components/market/market-card';
import {
  generateChartData,
  MarketTabs,
  TabItem,
} from '@/components/market/market-tabs';
import {
  FocusAwareStatusBar,
  Input,
  List,
  SafeAreaView,
  View,
} from '@/components/ui';
import { SearchIcon } from '@/components/ui/icons';

const MOCK_DATA = [
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
];

export default function Feed() {
  const [activeTab, setActiveTab] = React.useState('featured');
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <AllCoins />
    </SafeAreaView>
  );
}

const AllCoins = () => {
  const [search, setSearch] = React.useState('');
  return (
    <View className="flex-1 px-4">
      <View className="flex-row items-center justify-between ">
        <View className="">
          <TabItem title="All Coins" isActive={true} onPress={() => {}} />
        </View>
        <KeyboardAvoidingView className="flex-1 ">
          <Input
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            rightIcon={<SearchIcon size={20} />}
          />
        </KeyboardAvoidingView>
      </View>
      <List
        className="flex-1"
        data={MOCK_DATA}
        renderItem={({ item }) => (
          <MarketCard key={item.symbol} {...item} size="lg" />
        )}
      />
    </View>
  );
};
