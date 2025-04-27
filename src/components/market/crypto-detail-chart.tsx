import * as React from 'react';
import { Dimensions, Text } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { View } from '@/components/ui';
import colors from '@/components/ui/colors';

type DataPoint = {
  timestamp: string;
  price: number;
};

type CandleData = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

type Props = {
  data: DataPoint[];
  color?: string;
  height?: number;
};

// Width of the Y-axis column
const Y_AXIS_WIDTH = 60;

// Helper function to create candlestick data
function createCandlestickData(data: DataPoint[]): CandleData[] {
  if (!data || data.length === 0) return [];

  // Generate synthetic OHLC data from price data
  return data.map((point, index): CandleData => {
    const current = point.price;
    const prev = index > 0 ? data[index - 1].price : current;

    // Simulate candlestick data
    const variance = current * 0.01; // 1% variance

    return {
      timestamp: new Date(point.timestamp).getTime(),
      open: prev,
      high: Math.max(current, prev) + variance,
      low: Math.min(current, prev) - variance,
      close: current,
    };
  });
}

// Format price as USD with k suffix
function formatUSD(price: number) {
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
function PriceLabel({ value, style }: { value: number; style?: any }) {
  return (
    <Text className="pr-2.5 text-right text-xs text-neutral-500" style={style}>
      {formatUSD(value)}
    </Text>
  );
}

// Y-axis component that shows price values
function YAxis({ data }: { data: CandleData[] }) {
  // Calculate min and max values from OHLC data
  const prices = React.useMemo(() => {
    if (!data.length) return { min: 0, max: 0 };

    const allPrices = data.flatMap((candle) => [
      candle.open,
      candle.high,
      candle.low,
      candle.close,
    ]);

    return {
      min: Math.min(...allPrices),
      max: Math.max(...allPrices),
    };
  }, [data]);

  // Calculate price increments for the y-axis
  const priceRange = prices.max - prices.min;
  const priceStep = priceRange / 4;

  return (
    <View className="absolute right-0 h-full w-[60px] border-l border-white/10 bg-transparent py-2.5">
      {/* Fixed positions for price labels */}
      <View className="absolute right-1 top-2.5">
        <PriceLabel value={prices.max} />
      </View>

      <View className="absolute right-1 top-1/4">
        <PriceLabel value={prices.max - priceStep} />
      </View>

      <View className="absolute right-1 top-1/2">
        <PriceLabel value={prices.min + priceRange / 2} />
      </View>

      <View className="absolute right-1 top-3/4">
        <PriceLabel value={prices.min + priceStep} />
      </View>

      <View className="absolute bottom-2.5 right-1">
        <PriceLabel value={prices.min} />
      </View>
    </View>
  );
}

// Chart content component
function ChartContent({
  data,
  height,
}: {
  data: CandleData[];
  height: number;
}) {
  // Calculate chart width based on screen width minus the Y-axis
  const chartWidth = React.useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth - Y_AXIS_WIDTH;
  }, []);

  return (
    <CandlestickChart.Provider data={data}>
      <CandlestickChart
        width={chartWidth}
        height={height}
        style={{ backgroundColor: 'transparent', width: '100%' as const }}
      >
        {/* Grid lines */}
        <View className="absolute inset-0">
          {/* Horizontal grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((position) => (
            <View
              key={`h-line-${position}`}
              className="absolute inset-x-0 h-px bg-white/5"
              style={{ top: `${position * 100}%` }}
            />
          ))}
        </View>

        {/* Candles */}
        <CandlestickChart.Candles
          positiveColor={colors.primary[500]}
          negativeColor={colors.danger[500]}
        />

        {/* Crosshair with explicitly constrained tooltip */}
        <CandlestickChart.Crosshair>
          <CandlestickChart.Tooltip
            style={{
              backgroundColor: colors.primary[500],
              borderRadius: 20,
              padding: 8,
              minWidth: 70,
            }}
            xGutter={16}
            yGutter={16}
          >
            <CandlestickChart.PriceText
              type="close"
              style={{
                minWidth: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'black',
                fontWeight: 'bold',
              }}
            />
          </CandlestickChart.Tooltip>
        </CandlestickChart.Crosshair>
      </CandlestickChart>
    </CandlestickChart.Provider>
  );
}

export function CryptoDetailChart({ data, height = 300 }: Props) {
  // Transform data to candlestick format
  const candlestickData = React.useMemo(
    () => createCandlestickData(data),
    [data]
  );

  if (candlestickData.length === 0) {
    return <View className="h-full" style={{ height }} />;
  }

  return (
    <View
      className="flex-row overflow-hidden bg-transparent"
      style={{ height }}
    >
      {/* Chart container with fixed width to exclude Y-axis */}
      <View className="mr-[60px] flex-1 overflow-hidden">
        <ChartContent data={candlestickData} height={height} />
      </View>

      {/* Y-axis component */}
      <YAxis data={candlestickData} />
    </View>
  );
}
