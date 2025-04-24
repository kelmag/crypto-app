/* eslint-disable max-lines-per-function */
import * as React from 'react';

import { colors, Image, Text, View } from '@/components/ui';
import { BnbIcon, BtcIcon, EthIcon, SolIcon } from '@/components/ui/icons';

import { CryptoChart } from './crypto-chart';

type Props = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  chartData: { timestamp: string; price: number }[];
  size?: 'default' | 'lg';
  image?: string;
};

const renderCryptoIcon = (symbol: string, image: string | undefined) => {
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
      return image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 38, height: 38 }}
          contentFit="contain"
        />
      ) : null;
  }
};

export function CoinCard({
  symbol,
  name,
  price,
  change,
  chartData,
  image,
  size = 'default',
}: Props) {
  const isPositive = change >= 0;
  const chartColor = isPositive ? colors.primary[500] : colors.danger[500];

  const isLarge = size === 'lg';

  return (
    <View
      className={`${isLarge ? 'mt-2 w-full' : 'mr-2 w-[200px]'} rounded-3xl border border-neutral-900 bg-neutral-950 p-4`}
    >
      <CardHeader
        symbol={symbol}
        name={name}
        price={price}
        change={change}
        isLarge={isLarge}
        image={image}
        isPositive={isPositive}
      />

      <View
        className={`${isLarge ? 'flex-row-reverse items-end' : 'flex-col'}`}
      >
        <View className={`${isLarge ? 'my-4 flex-1' : 'my-4'}`}>
          <CryptoChart data={chartData} color={chartColor} height={80} />
        </View>

        <View className={`${isLarge ? 'flex-1' : 'mt-2'}`}>
          <View className="flex-row items-center justify-between">
            <Text
              className={`font-regular ${isLarge ? 'text-xl' : 'text-lg'} text-white`}
            >
              $
              {price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            {!isLarge && (
              <ChangePercent isPositive={isPositive} change={change} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const CardHeader = ({
  symbol,
  name,
  change,
  isLarge,
  image,
  isPositive,
}: {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isPositive: boolean;
  isLarge: boolean;
  image: string | undefined;
}) => {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1">
        <View className="flex-row items-center">
          {renderCryptoIcon(symbol, image)}
          <View className="ml-2">
            <Text className="text-xl font-normal text-white">{symbol}</Text>
            <Text className="text-base font-light dark:text-gray-500">
              {name}
            </Text>
          </View>
        </View>
      </View>
      {isLarge && <ChangePercent isPositive={isPositive} change={change} />}
    </View>
  );
};

const ChangePercent = ({
  isPositive,
  change,
}: {
  isPositive: boolean;
  change: number;
}) => {
  return (
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
  );
};
