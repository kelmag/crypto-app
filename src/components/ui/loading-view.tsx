import React from 'react';
import { ActivityIndicator } from 'react-native';

import { View } from '@/components/ui';

export function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
