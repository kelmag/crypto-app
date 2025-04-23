import * as React from 'react';
import { View } from 'react-native';

import { colors, Text } from '@/components/ui';
import { BnbIcon, BtcIcon, EthIcon, SolIcon } from '@/components/ui/icons';

import { CryptoChart } from './crypto-chart';

type Props = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  chartData: { timestamp: string; price: number }[];
};

export function MarketCard({ symbol, name, price, change, chartData }: Props) {
  const isPositive = change >= 0;
  const chartColor = isPositive ? colors.primary[500] : colors.danger[500];

  const renderCryptoIcon = () => {
    switch (symbol) {
      case 'BTC':
        return <BtcIcon size={38} />;
      case 'ETH':
        return <EthIcon size={38} />;
      case 'SOL':
        return <SolIcon size={38} />;
      case 'BNB':
        return <BnbIcon size={38} />;
      default:
        return null;
    }
  };

  return (
    <View className="mr-4 w-[200px] rounded-3xl border border-neutral-900 bg-neutral-950 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            {renderCryptoIcon()}
            <View className="ml-2">
              <Text className="text-xl font-normal text-white">{symbol}</Text>
              <Text className="text-base font-light dark:text-gray-500">
                {name}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View className="my-4">
        <CryptoChart data={chartData} color={chartColor} height={60} />
      </View>

      <View className="mt-2">
        <View className="flex-row items-center justify-between">
          <Text className="font-regular text-lg text-white">
            $
            {price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View className="rounded-lg bg-neutral-900 p-1">
            <Text
              className={`text-sm font-light ${
                isPositive ? 'dark:text-primary-500' : 'dark:text-danger-500'
              }`}
            >
              {isPositive ? '+' : ''}
              {change.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
