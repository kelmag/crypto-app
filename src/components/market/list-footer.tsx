import React from 'react';
import { ActivityIndicator } from 'react-native';

import { View } from '@/components/ui';

type ListFooterProps = {
  loading: boolean;
};

export function ListFooter({ loading }: ListFooterProps) {
  if (!loading) return null;
  return (
    <View className="flex items-center justify-center py-4">
      <ActivityIndicator size="small" />
    </View>
  );
}
