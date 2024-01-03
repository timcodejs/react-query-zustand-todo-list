import { useEffect, useState } from 'react';
import { STORAGE_ENUM } from '../../Utility/utils/Enums';
import { removeToken, setToken } from '../../Utility/utils/Storage';
import { useAuthStore } from '../../Store/stores/authStore';

export const NaverCallback = () => {
  const { naver }: any = window;
  const [isNaverLogin, setIsNaverLogin] = useState<any>();
  const NAVER_CLIENT_ID: string | undefined =
    process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL: string | undefined =
    process.env.REACT_APP_NAVER_CALLBACK_URL;

  // store
  const { naverToken, setNaverToken, setAccessToken } = useAuthStore();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        height: 60,
      },
      callbackHandle: true,
    });
    naverLogin.init();

    try {
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const username = naverLogin.user.getName();
          if (username === null || username === undefined) {
            alert('이름이 필요합니다. 정보제공을 동의해주세요.');
            naverLogin.reprompt();
            return;
          } else {
            setIsNaverLogin(naverLogin);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];

    setNaverToken(true);
    setAccessToken(token);
    setToken(localStorage, STORAGE_ENUM.ACCESS_TOKEN, token);
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  const naverLogout = () => {
    isNaverLogin.logout();
    setNaverToken(false);
    setAccessToken('');
    removeToken(STORAGE_ENUM.ACCESS_TOKEN);
  };

  return { naverToken, isNaverLogin, naverLogout };
};
