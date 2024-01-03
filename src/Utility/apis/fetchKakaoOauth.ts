import { request } from './request';

const fetchKakaoToken = async (
  grantType: string,
  KAKAO_REST_API_KEY: string | undefined,
  KAKAO_REDIRECT_URI: string | undefined,
  code: string | null
) => {
  return await request(
    'post',
    `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`,
    { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    {}
  );
};

const fetchKakaoInfo = async (accessToken: string) => {
  return await request(
    'post',
    `https://kapi.kakao.com/v2/user/me`,
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    {}
  );
};

const fetchKakaoLogout = async (accessToken: string) => {
  return await request(
    'post',
    'https://kapi.kakao.com/v1/user/logout',
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    {}
  );
};

export { fetchKakaoToken, fetchKakaoInfo, fetchKakaoLogout };
