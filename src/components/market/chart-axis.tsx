import * as React from 'react';
import { Text } from 'react-native';

import { View } from '@/components/ui';

// Width of the Y-axis column
export const Y_AXIS_WIDTH = 60;

// Types for the data
export type CandleData = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

// Format price as USD with k suffix
export function formatUSD(price: number) {
  return price >= 1000
    ? `$${Math.round(price / 1000)}k`
    : price >= 100
      ? `$${Math.round(price)}`
      : price >= 10
        ? `$${price.toFixed(1)}`
        : price >= 1
          ? `$${price.toFixed(2)}`
          : `$${price.toFixed(3)}`;
}

// Y-axis label component
export function PriceLabel({ value, style }: { value: number; style?: any }) {
  return (
    <Text className="pr-2.5 text-right text-xs text-neutral-500" style={style}>
      {formatUSD(value)}
    </Text>
  );
}

type YAxisProps = {
  min: number;
  max: number;
  borderColor?: string;
};

// Y-axis component that shows price values
export function YAxis({
  min,
  max,
  borderColor = 'rgba(255, 255, 255, 0.1)',
}: YAxisProps) {
  // Calculate price increments for the y-axis
  const priceRange = max - min;
  const priceStep = priceRange / 4;

  return (
    <View
      className="absolute right-0 top-0 z-10 h-full border-l bg-transparent py-2.5"
      style={{
        width: Y_AXIS_WIDTH,
        borderColor,
      }}
    >
      {/* Fixed positions for price labels */}
      <View className="absolute right-1 top-2.5">
        <PriceLabel value={max} />
      </View>

      <View className="absolute right-1 top-1/4">
        <PriceLabel value={max - priceStep} />
      </View>

      <View className="absolute right-1 top-1/2">
        <PriceLabel value={min + priceRange / 2} />
      </View>

      <View className="absolute right-1 top-3/4">
        <PriceLabel value={min + priceStep} />
      </View>

      <View className="absolute bottom-2.5 right-1">
        <PriceLabel value={min} />
      </View>
    </View>
  );
}

// Helper function to calculate min and max values from data
export function calculatePriceRange(data: CandleData[] | number[]) {
  if (!data.length) return { min: 0, max: 0 };

  if (typeof data[0] === 'number') {
    // Handle simple price array
    const prices = data as number[];
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  } else {
    // Handle candle data
    const candleData = data as CandleData[];
    const allPrices = candleData.flatMap((candle) => [
      candle.open,
      candle.high,
      candle.low,
      candle.close,
    ]);

    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices),
    };
  }
}
