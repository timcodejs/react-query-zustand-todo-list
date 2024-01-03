import { request } from './request';

const fetchGoogleUserInfo = async (accessToken: string) => {
  return await request(
    'get',
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    {}
  );
};

export { fetchGoogleUserInfo };
