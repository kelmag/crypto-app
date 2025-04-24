import React from 'react';

import { AllCoins } from '@/components/market/all-coins';
import { MarketTabs } from '@/components/market/market-tabs';
import { FocusAwareStatusBar, SafeAreaView } from '@/components/ui';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('featured');
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <AllCoins />
    </SafeAreaView>
  );
}
