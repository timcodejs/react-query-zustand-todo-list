import { createQueryKeys } from '@lukemorales/query-key-factory';

export const posts = createQueryKeys('posts', {
  getData: (storeCode: string) => [storeCode],
  postData: (storeCode: string) => [storeCode],
  deleteData: (storeCode: string) => [storeCode],
  updateData: (storeCode: string) => [storeCode],
});

export const auths = createQueryKeys('auths', {
  kakaoToken: (storeCode: string) => [storeCode],
  kakaoInfo: (storeCode: string) => [storeCode],
  kakaoLogout: (storeCode: string) => [storeCode],
  googleInfo: (storeCode: string) => [storeCode],
});

export const scroll = createQueryKeys('scroll', {
  getScroll: (storeCode: string) => [storeCode],
});

export const search = createQueryKeys('search', {
  getSearch: (storeCode: string) => [storeCode],
});
