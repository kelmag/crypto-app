import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { AllCoins } from '@/components/market/all-coins';
import { MarketTabs } from '@/components/market/market-tabs';
import { FocusAwareStatusBar, SafeAreaView } from '@/components/ui';
import { Logout } from '@/components/ui/icons/logout';
import { signOut } from '@/lib';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('featured');

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top']}>
      <FocusAwareStatusBar />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <AllCoins />

      <TouchableOpacity
        onPress={handleSignOut}
        className="absolute bottom-8 right-8 size-14 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-700"
        activeOpacity={0.8}
      >
        <Logout color="#FF3440" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
