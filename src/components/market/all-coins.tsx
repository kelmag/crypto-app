import React from 'react';
import { RefreshControl } from 'react-native';

import { View } from '@/components/ui';
import { ErrorView } from '@/components/ui/error-view';
import { LoadingView } from '@/components/ui/loading-view';
import { useCoinList } from '@/hooks/use-coin-list';

import { CoinList } from './market-list';
import { SearchHeader } from './search-header';

export function AllCoins() {
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    coins,
    isLoading,
    isError,
    isFetchingNextPage,
    search,
    setSearch,
    handleLoadMore,
    refetch,
  } = useCoinList();

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return (
      <View className="flex-1 px-4">
        <SearchHeader search={search} setSearch={setSearch} />
        <LoadingView />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 px-4">
        <SearchHeader search={search} setSearch={setSearch} />
        <ErrorView />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4">
      <SearchHeader search={search} setSearch={setSearch} />
      <CoinList
        data={coins}
        handleLoadMore={handleLoadMore}
        isFetchingNextPage={isFetchingNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}
