import { useMutation } from '../../Business/hooks/useMutation';
import { auths } from '../../Utility/utils/queryKeys';
import {
  fetchKakaoToken,
  fetchKakaoInfo,
  fetchKakaoLogout,
} from '../../Utility/apis/fetchKakaoOauth';

export const useKakaoTokenQuery = (
  grantType: string,
  KAKAO_REST_API_KEY: string | undefined,
  KAKAO_REDIRECT_URI: string | undefined,
  code: string | null
) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.kakaoToken('kakaoToken').queryKey,
    () =>
      fetchKakaoToken(grantType, KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI, code)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useKakaoInfoQuery = (accessToken: string) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.kakaoInfo('kakaoInfo').queryKey,
    () => fetchKakaoInfo(accessToken)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useKakaoLogoutQuery = (accessToken: string) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.kakaoLogout('kakaoLogout').queryKey,
    () => fetchKakaoLogout(accessToken)
  );

  return { data, mutate, isError, error, isSuccess };
};
