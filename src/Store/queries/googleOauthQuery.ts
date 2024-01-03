import { useQuery } from '../../Business/hooks/useQuery';
import { auths } from '../../Utility/utils/queryKeys';
import { fetchGoogleUserInfo } from '../../Utility/apis/fetchGoogleOauth';

export const useGetGoogleInfoQuery = (accessToken: string) => {
  const {
    data: userData,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(auths?.googleInfo('googleInfo').queryKey, () =>
    fetchGoogleUserInfo(accessToken)
  );
  return {
    userData,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
    refetch,
  };
};
