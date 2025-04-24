import React from 'react';

import type { Coin } from '@/api/types';
import { useAllCoins } from '@/api/use-all-coins';

type UseCoinListReturn = {
  coins: Coin[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  search: string;
  setSearch: (value: string) => void;
  handleLoadMore: () => void;
  refetch: () => void;
};

export function useCoinList(currency = 'usd', perPage = 20): UseCoinListReturn {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');

  // Debounce search input to prevent excessive filtering
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useAllCoins({
    variables: {
      currency,
      per_page: perPage,
    },
  });

  const coins = React.useMemo(() => {
    if (!data) return [];

    if (debouncedSearch.length === 0) {
      return data.pages.flatMap((page) => page.data);
    }

    const searchLower = debouncedSearch.toLowerCase();
    return data.pages.flatMap((page) =>
      page.data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      )
    );
  }, [data, debouncedSearch]);

  const handleLoadMore = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    coins,
    isLoading,
    isError,
    isFetchingNextPage,
    search,
    setSearch,
    handleLoadMore,
    refetch,
  };
}
