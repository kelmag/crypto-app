import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from './common';
import type { CoinData } from './types';

type Days = 1 | 7 | 30 | 365 | 'max';

type Variables = {
  productId: number;
  days: Days;
};

type Response = CoinData[];

export const useCoin = createQuery<Response, Variables, AxiosError>({
  queryKey: ['coin'],
  fetcher: (variables) => {
    return client
      .get(`coin-ohlc`, {
        params: {
          productId: variables.productId,
          days: variables.days,
        },
      })
      .then((response) => response.data);
  },
});
