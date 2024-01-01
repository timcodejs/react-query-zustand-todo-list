import { useInfiniteQuery } from '@tanstack/react-query';
import { scroll } from '../../Utility/utils/queryKeys';
import { fetchScroll } from '../../Utility/apis/fetchScroll';

export const useGetScrollDataQuery = () => {
  const {
    data: scrollDatas,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: scroll?.getScroll('getScroll').queryKey,
    queryFn: ({ pageParam = 1 }) => fetchScroll(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage에는 fetch callback의 리턴값이 전달됨
      // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
      const maxPage = lastPage.total_count / 15; // 한번에 15개씩 보여주기
      const nextPage = allPages.length + 1;
      return nextPage <= maxPage ? nextPage : undefined; // 다음 데이터가 있는지 없는지 판단
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });

  return {
    scrollDatas,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
