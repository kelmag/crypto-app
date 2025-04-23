import React from 'react';

import { MarketTabs } from '@/components/market/market-tabs';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

export default function Feed() {
  const [activeTab, setActiveTab] = React.useState('featured');

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <FocusAwareStatusBar />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <View className="flex-1 px-4">
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
}
