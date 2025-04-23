import * as React from 'react';
import { View } from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

type DataPoint = {
  timestamp: string;
  price: number;
};

type Props = {
  data: DataPoint[];
  color: string;
  height?: number;
};

export function CryptoChart({ data, color, height = 80 }: Props) {
  const { state } = useChartPressState({
    x: '',
    y: { price: 0 },
  });

  // Generate min and max for the domain
  const prices = data.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  // Add 2% padding to the top and bottom
  const padding = (maxPrice - minPrice) * 0.02;

  return (
    <View style={{ height }}>
      <CartesianChart
        data={data}
        xKey="timestamp"
        yKeys={['price']}
        domain={{
          y: [minPrice - padding, maxPrice + padding],
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
    </View>
  );
}
