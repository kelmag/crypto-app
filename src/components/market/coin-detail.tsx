import * as React from 'react';
import { Pressable } from 'react-native';

import {
  ActivityIndicator,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import colors from '@/components/ui/colors';
import { ExpandIcon } from '@/components/ui/icons';
import { BgBlur } from '@/components/ui/icons/bg-blur';

import { ChangePercent } from './change-percent';
import { CryptoChart } from './crypto-chart';

type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';

type CoinDetailProps = {
  symbol: string;
  name: string;
  price: number;
  priceChangePercentage: number;
  chartData: { timestamp: string; price: number }[];
  isLoading?: boolean;
  image?: string;
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
};

// Price information component
function PriceInfo({
  price,
  priceChangePercentage,
}: {
  price: number;
  priceChangePercentage: number;
}) {
  const isPositive = priceChangePercentage >= 0;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <View className="px-4">
      <Text className="font-regular text-4xl text-white">{formattedPrice}</Text>
      <View className="mt-2 flex-row items-center">
        <ChangePercent isPositive={isPositive} change={priceChangePercentage} />
      </View>
    </View>
  );
}

// Time range selector component
function TimeRangeSelector({
  selectedRange,
  onRangeChange,
}: {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}) {
  const timeRanges: TimeRange[] = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <View className="mt-6 flex-row justify-between px-4">
      {timeRanges.map((range) => (
        <Pressable
          key={range}
          className={`rounded-lg px-4 py-2 ${
            selectedRange === range ? 'bg-primary-500' : 'bg-transparent'
          }`}
          onPress={() => onRangeChange(range)}
        >
          <Text
            className={`text-md font-medium ${
              selectedRange === range ? 'dark:text-black' : 'dark:text-gray-500'
            }`}
          >
            {range}
          </Text>
        </Pressable>
      ))}
      <Pressable
        className="rounded-lg bg-transparent px-4 py-2"
        onPress={() => {}}
      >
        <ExpandIcon size={20} />
      </Pressable>
    </View>
  );
}

export function CoinDetail({
  price,
  priceChangePercentage,
  chartData,
  isLoading = false,
  selectedTimeRange,
  onTimeRangeChange,
}: CoinDetailProps) {
  const isPositive = priceChangePercentage >= 0;
  const chartColor = isPositive ? colors.primary[500] : colors.danger[500];

  return (
    <SafeAreaView className="flex-1 bg-black " edges={['bottom']}>
      <FocusAwareStatusBar />
      <View className="mb-10 flex-1 rounded-b-[50px] bg-neutral-900 ">
        <BackgroundBlur />
        <View className="flex-1 pt-10">
          <PriceInfo
            price={price}
            priceChangePercentage={priceChangePercentage}
          />

          {/* Chart section */}
          <View className="my-10 flex-1 justify-end">
            <View className="flex-1 justify-center ">
              {isLoading ? (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator />
                </View>
              ) : (
                <CryptoChart data={chartData} color={chartColor} height={300} />
              )}
            </View>
            <TimeRangeSelector
              selectedRange={selectedTimeRange}
              onRangeChange={onTimeRangeChange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function BackgroundBlur() {
  return (
    <View className="absolute inset-0 ">
      <BgBlur />
    </View>
  );
}
