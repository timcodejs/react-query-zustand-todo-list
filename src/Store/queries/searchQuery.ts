import { useQuery } from '../../Business/hooks/useQuery';
import { search } from '../../Utility/utils/queryKeys';
import { fetchSearchList } from '../../Utility/apis/fetchSearch';

export const useGetSearchDataQuery = (keyword: string) => {
  const {
    data: searchDatas,
    status,
    refetch,
  } = useQuery(
    search?.getSearch(keyword).queryKey,
    () => fetchSearchList(keyword),
    { enabled: !!keyword }
  );

  return { searchDatas, status, refetch };
};
