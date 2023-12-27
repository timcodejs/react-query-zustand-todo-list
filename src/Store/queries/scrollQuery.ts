import { useQuery } from '../../Business/hooks/useQuery';
import { scroll } from '../../Utility/utils/queryKeys';

export const useGetScrollDataQuery = (quryString: string) => {
  const {
    data: scrollDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(scroll?.getScroll('getScroll').queryKey, () =>
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=1${quryString}`)
      .then((res: any) => res.json())
      .then((data) => data)
  );
  return { scrollDatas, isLoading, isFetching, isError, error, refetch };
};
