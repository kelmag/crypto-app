import React from 'react';

import type { Coin } from '@/api/types';
import { ListFooter } from '@/components/market/list-footer';
import { List } from '@/components/ui';

import { CoinCard } from './coin-card';

type CoinListProps = {
  data: Coin[];
  handleLoadMore: () => void;
  isFetchingNextPage: boolean;
  refreshControl?: React.ReactElement<any, any>;
};

export function CoinList({
  data,
  handleLoadMore,
  isFetchingNextPage,
  refreshControl,
}: CoinListProps) {
  return (
    <List
      className="flex-1"
      data={data}
      estimatedItemSize={190}
      renderItem={({ item }) => <CoinCard coin={item} size="lg" />}
      keyExtractor={(item) => item.id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ListFooter loading={isFetchingNextPage} />}
      refreshControl={refreshControl}
    />
  );
}
