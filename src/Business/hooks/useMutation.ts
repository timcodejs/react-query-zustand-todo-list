import {
  QueryFunctionContext,
  useMutation as useMutationOrigin,
} from '@tanstack/react-query';

/**
 * @file useMutation 커스텀 훅
 * @param queryFn 쿼리에 사용할 promise 기반의 비동기 API 함수 (API 요청 보내는 함수)
 * @returns
 */
export const useMutation = (
  mutationKey: any,
  mutationFn: (context: QueryFunctionContext) => Promise<any>,
  options: any = {}
) => {
  return useMutationOrigin<any, Error>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
    ...options,
  });
};
