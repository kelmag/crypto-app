import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';

import { client } from './common/client';
import { DEFAULT_LIMIT } from './common/utils';
import type { Coin } from './types';

type Response = {
  data: Coin[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

type Variables = {
  currency: string;
  pageSize?: number;
};

export const useAllCoins = createInfiniteQuery<Response, Variables, AxiosError>(
  {
    queryKey: ['all-coins'],
    initialPageParam: 1,
    fetcher: (variables, context) => {
      const page = context.pageParam ?? 1;
      const pageSize = variables?.pageSize ?? DEFAULT_LIMIT;

      return client
        .get(`coin-prices-all`, {
          params: {
            currency: variables?.currency,
            page,
            pageSize,
          },
        })
        .then((response) => response.data);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  }
);
