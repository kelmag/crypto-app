/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';

import { useCoin } from '@/api';
import type { Coin } from '@/api/types';
import { CoinDetail } from '@/components/market/coin-detail';
import {
  ActivityIndicator,
  BackButton,
  colors,
  FocusAwareStatusBar,
  Image,
  Text,
  View,
} from '@/components/ui';
import { BnbIcon, BtcIcon, EthIcon, SolIcon } from '@/components/ui/icons';

// Loading component to reduce main function length
function LoadingView() {
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

// Error component to reduce main function length
function ErrorView() {
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

export default function CoinDetailScreen() {
  const local = useLocalSearchParams<{
    id: string;
    symbol: string;
    name: string;
    image: string;
  }>();
  const router = useRouter();

  const productId = Number(local.id);
  const { symbol, name, image } = local;

  // Type definition for time range
  type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<TimeRange>('1W');

  // Map time range to days parameter
  const getDaysFromTimeRange = (range: TimeRange): 1 | 7 | 30 | 365 | 'max' => {
    switch (range) {
      case '1H':
        return 1; // Using 1 day cause the api only supports 1 day
      case '1D':
        return 1;
      case '1W':
        return 7;
      case '1M':
        return 30;
      case '1Y':
        return 365;
      case 'ALL':
        return 'max';
      default:
        return 30;
    }
  };

  // Track if we're just changing the time range
  const [isChangingTimeRange, setIsChangingTimeRange] = React.useState(false);

  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setIsChangingTimeRange(true);
    setSelectedTimeRange(range);
  };

  // Handle coin change
  const handleCoinChange = (coin: Coin) => {
    // Navigate to the new coin's detail page
    router.replace({
      pathname: '/(app)/[id]',
      params: {
        id: coin.productId.toString(),
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image || '',
      },
    });
  };

  const { data, isPending, isError } = useCoin({
    variables: {
      productId,
      days: getDaysFromTimeRange(selectedTimeRange),
    },
  });

  // Transform API data into chart data format
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => ({
      timestamp: new Date(item.date * 1000).toISOString(),
      price: item.usd.close,
    }));
  }, [data]);

  const firstDataPoint = data && data.length > 0 ? data[0] : null;
  const lastDataPoint = data && data.length > 0 ? data[data.length - 1] : null;

  // Calculate price change percentage
  const priceChangePercentage = React.useMemo(() => {
    if (!firstDataPoint || !lastDataPoint) return 0;
    const startPrice = firstDataPoint.usd.open;
    const endPrice = lastDataPoint.usd.close;
    return ((endPrice - startPrice) / startPrice) * 100;
  }, [firstDataPoint, lastDataPoint]);

  // Reset the changing state after data loads
  React.useEffect(() => {
    if (!isPending && isChangingTimeRange) {
      setIsChangingTimeRange(false);
    }
  }, [isPending, isChangingTimeRange]);

  // Initial loading - show full loading screen
  if (isPending && !isChangingTimeRange) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <CoinHeader name={name} symbol={symbol} image={image} />
          ),
          headerLeft: () => <BackButton />,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.neutral[900],
          },
          headerShadowVisible: false,
        }}
      />
      <CoinDetail
        symbol={symbol || 'BTC'}
        name={name || 'Bitcoin'}
        price={lastDataPoint?.usd.close || 0}
        priceChangePercentage={priceChangePercentage}
        chartData={chartData}
        isLoading={isPending && isChangingTimeRange}
        image={image}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={handleTimeRangeChange}
        onCoinChange={handleCoinChange}
      />
    </>
  );
}

// Helper function to render appropriate crypto icon
const renderCryptoIcon = (symbol: string, image: string | undefined) => {
  switch (symbol) {
    case 'BTC':
      return <BtcIcon size={32} />;
    case 'ETH':
      return <EthIcon size={32} />;
    case 'SOL':
      return <SolIcon size={32} />;
    case 'BNB':
      return <BnbIcon size={32} />;
    default:
      return image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 32, height: 32 }}
          contentFit="contain"
        />
      ) : null;
  }
};

function CoinHeader({
  name,
  symbol,
  image,
}: {
  name: string;
  symbol: string;
  image?: string;
}) {
  return (
    <View className="flex-row items-center  ">
      <View className="mr-3">{renderCryptoIcon(symbol, image)}</View>
      <Text className="text-xl font-semibold text-white">
        {name} ({symbol})
      </Text>
    </View>
  );
}
