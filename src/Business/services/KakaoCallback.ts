import { useEffect } from 'react';
import { useAuthStore } from '../../Store/stores/authStore';
import {
  useKakaoTokenQuery,
  useKakaoInfoQuery,
  useKakaoLogoutQuery,
} from '../../Store/queries/kakaoOauthQuery';
import { STORAGE_ENUM } from '../../Utility/utils/Enums';
import { removeToken, setToken } from '../../Utility/utils/Storage';

export const KakaoCallback = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code: string | null = params.get('code');
  const grantType: string = 'authorization_code';
  const KAKAO_REST_API_KEY: string | undefined =
    process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI: string | undefined =
    process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // store
  const { kakaoToken, accessToken, setKakaoToken, setAccessToken } =
    useAuthStore();

  // query
  const onTokenData = useKakaoTokenQuery(
    grantType,
    KAKAO_REST_API_KEY,
    KAKAO_REDIRECT_URI,
    code
  );
  const onInfoData = useKakaoInfoQuery(accessToken);
  const onLogoutData = useKakaoLogoutQuery(accessToken);

  useEffect(() => {
    if (code !== null) onTokenData.mutate();
  }, [code]);

  useEffect(() => {
    if (onTokenData.isSuccess) {
      setKakaoToken(true);
      setAccessToken(onTokenData.data.access_token);
      setToken(
        localStorage,
        STORAGE_ENUM.ACCESS_TOKEN,
        onTokenData.data.access_token
      );
    }
  }, [onTokenData.isSuccess]);

  useEffect(() => {
    if (kakaoToken && accessToken !== '') onInfoData.mutate();
  }, [kakaoToken, accessToken]);

  useEffect(() => {
    if (onLogoutData.isSuccess) {
      setKakaoToken(false);
      setAccessToken('');
      removeToken(STORAGE_ENUM.ACCESS_TOKEN);
      window.location.href = '/oauth';
    }
  }, [onLogoutData.isSuccess]);

  return { onTokenData, onInfoData, onLogoutData };
};
