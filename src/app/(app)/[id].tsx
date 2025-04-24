import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useCoin } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';

export default function CoinDetail() {
  const local = useLocalSearchParams<{ id: string }>();
  const productId = Number(local.id);

  const { data, isPending, isError } = useCoin({
    variables: {
      productId,
      days: 30,
    },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen
          options={{ title: 'Coin Detail', headerBackTitle: 'Coins' }}
        />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen
          options={{ title: 'Coin Detail', headerBackTitle: 'Coins' }}
        />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading coin data</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-3">
      <Stack.Screen
        options={{ title: 'Coin Detail', headerBackTitle: 'Coins' }}
      />
      <FocusAwareStatusBar />
      <Text className="text-xl">Coin Data</Text>
      {data && data.length > 0 && (
        <View className="mt-4">
          <Text>Open: {data[0].usd.open}</Text>
          <Text>High: {data[0].usd.high}</Text>
          <Text>Low: {data[0].usd.low}</Text>
          <Text>Close: {data[0].usd.close}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
