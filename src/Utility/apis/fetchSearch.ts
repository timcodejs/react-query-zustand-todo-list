import { request } from './request';

const fetchSearchList = async (keyword: string) => {
  const NAVER_CLIENT_ID: string | undefined =
    process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET: string | undefined =
    process.env.REACT_APP_NAVER_CLIENT_SECRET;

  return await request(
    'get',
    '/naver_api/v1/search/book.json',
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
    },
    { query: keyword }
  );
};

export { fetchSearchList };
