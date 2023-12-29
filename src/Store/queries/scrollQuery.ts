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
    queryFn: async ({ pageParam = 1 }) =>
      await request(
        'get',
        `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${pageParam}`,
        {},
        {}
      ),
    getNextPageParam: (lastPage, allPages) => {
      // lastPage에는 fetch callback의 리턴값이 전달됨
      // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
      const maxPage = lastPage.total_count / 15; // 한번에 30개씩 보여주기
      const nextPage = allPages.length + 1;
      return nextPage <= maxPage ? nextPage : undefined; // 다음 데이터가 있는지 없는지 판단
      // const nextPage = lastPage.limit + 5;
      // return inView ? nextPage : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });

  return { scrollDatas, fetchNextPage, hasNextPage, isFetching };
};
