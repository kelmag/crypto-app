/* eslint-disable max-lines-per-function */
import * as React from 'react';
import { Pressable } from 'react-native';

import type { Coin } from '@/api/types';
import { useAllCoins } from '@/api/use-all-coins';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Image,
  Options,
  type OptionType,
  SafeAreaView,
  Text,
  useModal,
  View,
} from '@/components/ui';
import colors from '@/components/ui/colors';
import { ExpandIcon } from '@/components/ui/icons';
import { BnbIcon, BtcIcon, EthIcon, SolIcon } from '@/components/ui/icons';
import { BgBlur } from '@/components/ui/icons/bg-blur';

import { ChangePercent } from './change-percent';
import { CryptoChart } from './crypto-chart';
import { CryptoDetailChart } from './crypto-detail-chart';

type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';
type ChartType = 'line' | 'candlestick';

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
  onCoinChange?: (coin: Coin) => void;
  marketCap?: number;
  tradingVolume?: number;
};

const formatValue = (value?: number): string => {
  if (!value) return 'N/A';

  // Format large numbers with appropriate suffixes (B for billions, M for millions, etc.)
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

// Price information component
function PriceInfo({
  price,
  priceChangePercentage,
}: {
  price: number;
  priceChangePercentage: number;
  marketCap?: number;
  tradingVolume?: number;
}) {
  const isPositive = priceChangePercentage >= 0;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <View className="">
      <Text className="font-regular text-4xl text-white">{formattedPrice}</Text>
      <View className="mt-2 flex-row items-center">
        <ChangePercent isPositive={isPositive} change={priceChangePercentage} />
      </View>
    </View>
  );
}

// Render crypto icon helper
function renderCryptoIcon(symbol: string, image?: string) {
  switch (symbol) {
    case 'BTC':
      return <BtcIcon size={20} />;
    case 'ETH':
      return <EthIcon size={20} />;
    case 'SOL':
      return <SolIcon size={20} />;
    case 'BNB':
      return <BnbIcon size={20} />;
    default:
      return image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 20, height: 20 }}
          contentFit="contain"
        />
      ) : null;
  }
}

// Coin selector component
function CoinSelector({
  onCoinChange,
  symbol,
  image,
}: {
  onCoinChange?: (coin: Coin) => void;
  symbol: string;
  image?: string;
}) {
  const modal = useModal();
  const { data } = useAllCoins({
    variables: {
      currency: 'usd',
      pageSize: 20,
    },
  });

  const coins = React.useMemo(() => {
    if (!data?.pages?.[0]?.data) return [];
    return data.pages[0].data;
  }, [data]);

  const coinOptions: OptionType[] = React.useMemo(() => {
    return coins.map((coin) => ({
      label: `${coin.name} (${coin.symbol.toUpperCase()})`,
      value: coin.id,
      // We need to pass the coin data through the options
      // @ts-ignore - we're extending OptionType with our own data
      metadata: coin,
    }));
  }, [coins]);

  const onSelectCoin = React.useCallback(
    (option: OptionType) => {
      // @ts-ignore - we've extended OptionType with our own data
      const selectedCoin = option.metadata as Coin;
      if (selectedCoin && onCoinChange) {
        onCoinChange(selectedCoin);
      }
      modal.dismiss();
    },
    [modal, onCoinChange]
  );

  return (
    <>
      <Pressable
        className="ml-2 rounded-lg bg-transparent p-2"
        onPress={modal.present}
      >
        <View className="flex-row items-center">
          {renderCryptoIcon(symbol, image)}
          <ExpandIcon size={20} />
        </View>
      </Pressable>
      <Options
        ref={modal.ref}
        options={coinOptions}
        onSelect={onSelectCoin}
        value=""
      />
    </>
  );
}

// Chart type toggle button component
function ChartTypeToggle({
  chartType,
  onChartTypeChange,
}: {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}) {
  return (
    <Pressable
      className="rounded-lg bg-neutral-800 px-4 py-2 "
      onPress={() =>
        onChartTypeChange(chartType === 'line' ? 'candlestick' : 'line')
      }
    >
      <Text className="text-md font-medium text-primary-500">
        {chartType === 'line' ? 'Candlestick' : 'Line'}
      </Text>
    </Pressable>
  );
}

// Time range selector component
function TimeRangeSelector({
  selectedRange,
  onRangeChange,
  symbol,
  image,
  onCoinChange,
}: {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  symbol: string;
  image?: string;
  onCoinChange?: (coin: Coin) => void;
}) {
  const timeRanges: TimeRange[] = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <View className="mt-6 flex-row items-center justify-between px-4">
      <View className="flex-row">
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
                selectedRange === range
                  ? 'dark:text-black'
                  : 'dark:text-gray-500'
              }`}
            >
              {range}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row items-center">
        <CoinSelector
          symbol={symbol}
          image={image}
          onCoinChange={onCoinChange}
        />
      </View>
    </View>
  );
}

// Chart content component
function ChartContent({
  isLoading,
  chartType,
  chartData,
  chartColor,
}: {
  isLoading: boolean;
  chartType: ChartType;
  chartData: { timestamp: string; price: number }[];
  chartColor: string;
}) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {chartType === 'line' ? (
        <CryptoChart
          data={chartData}
          color={chartColor}
          height={300}
          showYAxis={true}
        />
      ) : (
        <CryptoDetailChart
          data={chartData}
          color={chartColor}
          height={300}
          showYAxis={true}
        />
      )}
    </>
  );
}

export function CoinDetail({
  price,
  priceChangePercentage,
  chartData,
  isLoading = false,
  selectedTimeRange,
  onTimeRangeChange,
  symbol,
  image,
  onCoinChange,
  marketCap,
  tradingVolume,
}: CoinDetailProps) {
  const isPositive = priceChangePercentage >= 0;
  const chartColor = isPositive ? colors.primary[500] : colors.danger[500];
  const [chartType, setChartType] = React.useState<ChartType>('candlestick');

  return (
    <SafeAreaView className="flex-1 bg-black " edges={['bottom']}>
      <FocusAwareStatusBar />
      <View className="mb-6 flex-1 rounded-b-[50px] bg-neutral-900 ">
        <BackgroundBlur />
        <View className="flex-1 pt-10">
          <View className="flex-row items-start justify-between   px-4">
            <PriceInfo
              price={price}
              priceChangePercentage={priceChangePercentage}
              marketCap={marketCap}
              tradingVolume={tradingVolume}
            />
            <View className="items-center">
              <ChartTypeToggle
                chartType={chartType}
                onChartTypeChange={setChartType}
              />
            </View>
          </View>
          {/* Additional coin data */}
          <View className=" flex-row justify-between  p-4">
            <View className=" justify-between">
              <Text className="text-sm font-medium text-gray-400">
                Market Cap
              </Text>
              <Text className="text-sm font-medium text-white">
                {formatValue(marketCap)}
              </Text>
            </View>
            <View className="justify-between">
              <Text className="text-sm font-medium text-gray-400">
                24h Volume
              </Text>
              <Text className="text-sm font-medium text-white">
                {formatValue(tradingVolume)}
              </Text>
            </View>
          </View>

          {/* Chart section */}
          <View className="mb-10 flex-1 justify-end ">
            <View className="flex-1 justify-center ">
              <ChartContent
                isLoading={isLoading}
                chartType={chartType}
                chartData={chartData}
                chartColor={chartColor}
              />
            </View>
            <TimeRangeSelector
              selectedRange={selectedTimeRange}
              onRangeChange={onTimeRangeChange}
              symbol={symbol}
              image={image}
              onCoinChange={onCoinChange}
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
