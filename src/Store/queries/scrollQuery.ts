import { useInfiniteQuery } from '@tanstack/react-query';
import { request } from '../../Utility/apis/request';
import { scroll } from '../../Utility/utils/queryKeys';

export const useGetScrollDataQuery = (inView: boolean) => {
  const {
    data: scrollDatas,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: scroll?.getScroll('getScroll').queryKey,
    queryFn: ({ pageParam }) =>
      request('get', `https://dummyjson.com/quotes?limit=${pageParam}`, {}, {}),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.limit + 5;
      return inView ? nextPage : undefined;
    },
    select: (data) => ({
      pages: data.pages[0],
      pageParams: data.pageParams,
    }),
    initialPageParam: 20,
  });

  return { scrollDatas, fetchNextPage, hasNextPage, isFetching };
};
