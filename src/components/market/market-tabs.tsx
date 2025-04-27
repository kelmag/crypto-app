import * as React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { type Coin } from '@/api/types';
import { useAllCoins } from '@/api/use-all-coins';
import { Text } from '@/components/ui';

import { CoinCard } from './coin-card';

type Tab = {
  id: string;
  title: string;
};

const TABS: Tab[] = [
  { id: 'featured', title: '⭐ Featured' },
  { id: 'gainers', title: '🚀 Top Gainers' },
  { id: 'losers', title: '🔻 Top Losers' },
];

// Helper component for error state
function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="items-center justify-center py-8">
      <Text className="text-danger-500">Failed to load coins</Text>
      <Text className="mt-2 text-primary-500" onPress={onRetry}>
        Tap to retry
      </Text>
    </View>
  );
}

// Helper component for loading state
function LoadingView() {
  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size="large" />
    </View>
  );
}

// Helper function to filter coins into categories
function categorizeCoins(coins: Coin[]) {
  if (!coins.length) return { featured: [], gainers: [], losers: [] };

  // Sort coins by price change percentage for gainers and losers
  const sortedByChange = [...coins].sort(
    (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h
  );

  return {
    // First 10 coins as featured
    featured: coins.slice(0, 10),
    // Top 10 gainers
    gainers: sortedByChange.slice(0, 10),
    // Bottom 10 losers
    losers: sortedByChange.slice(-10).reverse(),
  };
}

type Props = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export function MarketTabs({ activeTab, onTabChange }: Props) {
  const currency = 'USD';
  const pageSize = 30; // Get 30 coins to have enough for all categories

  const { data, isLoading, isError, refetch } = useAllCoins({
    variables: {
      currency,
      pageSize,
    },
  });

  const coins = React.useMemo(() => {
    if (!data?.pages?.[0]?.data) return [];
    return data.pages[0].data;
  }, [data]);

  // Filter coins into categories
  const categories = React.useMemo(() => categorizeCoins(coins), [coins]);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView onRetry={refetch} />;

  const activeData = categories[activeTab as keyof typeof categories] || [];

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
          {activeData.map((item: Coin) => (
            <CoinCard key={item.id} coin={item} />
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

export function TabItem({ title, isActive, onPress }: TabItemProps) {
  return (
    <View className="">
      <Text
        onPress={onPress}
        className={`px-8 py-3 text-xl ${
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
