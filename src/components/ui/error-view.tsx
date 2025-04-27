import React from 'react';

import { Text, View } from '@/components/ui';

type ErrorViewProps = {
  message?: string;
};

export function ErrorView({
  message = 'Failed to load coins',
}: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">{message}</Text>
    </View>
  );
}
