import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import { View as CustomView } from '@/components/ui';
import colors from '@/components/ui/colors';

import {
  calculatePriceRange,
  type CandleData,
  Y_AXIS_WIDTH,
  YAxis,
} from './chart-axis';

type DataPoint = {
  timestamp: string;
  price: number;
};

type Props = {
  data: DataPoint[];
  color?: string;
  height?: number;
  showYAxis?: boolean;
};

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

// Chart content component
function ChartContent({
  data,
  height,
  width,
}: {
  data: CandleData[];
  height: number;
  width: number | string;
}) {
  // Convert width to number if it's a percentage string
  const chartWidth = typeof width === 'string' ? undefined : width;

  return (
    <CandlestickChart.Provider data={data}>
      <CandlestickChart
        width={chartWidth}
        height={height}
        style={{
          backgroundColor: 'transparent',
          ...(typeof width === 'number' ? { width } : {}),
        }}
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

export function CryptoDetailChart({
  data,
  height = 300,
  showYAxis = true,
}: Props) {
  // Transform data to candlestick format
  const candlestickData = React.useMemo(
    () => createCandlestickData(data),
    [data]
  );

  // Calculate price range for the Y-axis
  const priceRange = React.useMemo(() => {
    return calculatePriceRange(candlestickData);
  }, [candlestickData]);

  // Calculate chart width based on screen width minus the Y-axis width if showing
  const chartWidth = React.useMemo(() => {
    if (!showYAxis) return '100%';
    const screenWidth = Dimensions.get('window').width;
    return screenWidth - Y_AXIS_WIDTH;
  }, [showYAxis]);

  if (candlestickData.length === 0) {
    return <CustomView className="h-full" style={{ height }} />;
  }

  return (
    <CustomView
      className="relative overflow-hidden bg-transparent"
      style={{ height }}
    >
      {/* Chart container */}
      <View
        style={{
          width: chartWidth,
          height: '100%',
          position: 'relative',
        }}
      >
        <ChartContent
          data={candlestickData}
          height={height}
          width={chartWidth}
        />
      </View>

      {/* Y-axis component */}
      {showYAxis && (
        <YAxis
          min={priceRange.min}
          max={priceRange.max}
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      )}
    </CustomView>
  );
}
