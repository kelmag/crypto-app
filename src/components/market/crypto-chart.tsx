import * as React from 'react';
import { Dimensions } from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

import { View } from '@/components/ui';

import { calculatePriceRange, Y_AXIS_WIDTH, YAxis } from './chart-axis';

type DataPoint = {
  timestamp: string;
  price: number;
};

type Props = {
  data: DataPoint[];
  color: string;
  height?: number;
  showYAxis?: boolean;
};

// Helper to render the chart line
type ChartLineProps = {
  data: DataPoint[];
  min: number;
  max: number;
  color: string;
  state: any;
};

function renderChartLine({ data, min, max, color, state }: ChartLineProps) {
  return (
    <CartesianChart
      data={data}
      xKey="timestamp"
      yKeys={['price']}
      domain={{
        y: [min, max],
      }}
      chartPressState={[state]}
      padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      {({ points }) => (
        <>
          <Line points={points.price} color={color} strokeWidth={2} />
        </>
      )}
    </CartesianChart>
  );
}

export function CryptoChart({
  data,
  color,
  height = 80,
  showYAxis = false,
}: Props) {
  const { state } = useChartPressState({
    x: '',
    y: { price: 0 },
  });

  // Generate min and max for the domain
  const prices = data.map((item) => item.price);
  const { min: minPrice, max: maxPrice } = calculatePriceRange(prices);

  // Add 2% padding to the top and bottom
  const padding = (maxPrice - minPrice) * 0.02;
  const min = minPrice - padding || 0; // Ensure we don't have NaN values
  const max = maxPrice + padding || 100; // Ensure we don't have NaN values

  // Calculate chart width based on whether Y-axis is shown
  const chartWidth = React.useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    return showYAxis ? screenWidth - Y_AXIS_WIDTH : screenWidth;
  }, [showYAxis]);

  return (
    <View className="relative overflow-hidden" style={{ height }}>
      <View
        className="relative h-full"
        style={{
          width: showYAxis ? chartWidth : '100%',
        }}
      >
        {data.length > 0 && renderChartLine({ data, min, max, color, state })}
      </View>

      {showYAxis && (
        <YAxis min={min} max={max} borderColor="rgba(255, 255, 255, 0.1)" />
      )}
    </View>
  );
}
