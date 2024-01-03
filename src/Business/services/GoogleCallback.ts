import { useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { STORAGE_ENUM } from '../../Utility/utils/Enums';
import { removeToken, setToken } from '../../Utility/utils/Storage';
import { useAuthStore } from '../../Store/stores/authStore';
import { useGetGoogleInfoQuery } from '../../Store/queries/googleOauthQuery';

export const GoogleCallback = () => {
  // store
  const { googleToken, accessToken, setGoogleToken, setAccessToken } =
    useAuthStore();

  // query
  const { userData, isSuccess, refetch } = useGetGoogleInfoQuery(accessToken);

  const onGoogleSocialLogin = useGoogleLogin({
    onSuccess: (res) => {
      setGoogleToken(true);
      setAccessToken(res.access_token);
      setToken(localStorage, STORAGE_ENUM.ACCESS_TOKEN, res.access_token);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (googleToken && accessToken !== '') {
      refetch();
    }
  }, [accessToken]);

  const useGoogleLogout = () => {
    googleLogout();
    setGoogleToken(false);
    setAccessToken('');
    removeToken(STORAGE_ENUM.ACCESS_TOKEN);
    window.location.href = '/oauth';
  };

  return { userData, isSuccess, useGoogleLogout, onGoogleSocialLogin };
};
