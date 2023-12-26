import { createQueryKeys } from '@lukemorales/query-key-factory';

export const posts = createQueryKeys('posts', {
  getData: (storeCode: string) => [storeCode],
  postData: (storeCode: string) => [storeCode],
  deleteData: (storeCode: string) => [storeCode],
  updateData: (storeCode: string) => [storeCode],
});

export const auths = createQueryKeys('auths', {
  getAuth: (storeCode: string) => [storeCode],
  postAuth: (storeCode: string) => [storeCode],
  deleteAuth: (storeCode: string) => [storeCode],
  updateAuth: (storeCode: string) => [storeCode],
});
