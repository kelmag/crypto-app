import { Text, View } from '@/components/ui';

export function ChangePercent({
  isPositive,
  change,
}: {
  isPositive: boolean;
  change: number;
}) {
  return (
    <View className="rounded-lg bg-neutral-800 p-1">
      <Text
        className={`font-regular text-sm ${
          isPositive ? 'dark:text-primary-500' : 'dark:text-danger-500'
        }`}
      >
        {isPositive ? '+' : ''}
        {change.toFixed(2)}%
      </Text>
    </View>
  );
}
