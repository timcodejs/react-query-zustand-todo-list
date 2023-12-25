import {
  QueryFunctionContext,
  useQuery as useQueryOrigin,
} from '@tanstack/react-query';
/**
 * @file useQuery 커스텀 훅
 * @param queryKey 해당 쿼리의 고유 식별자(unique key)
 * @param queryFn 쿼리에 사용할 promise 기반의 비동기 API 함수 (API 요청 보내는 함수)
 * @param options 쿼리에 사용할 옵션
 * @returns
 */
export const useQuery = (
  queryKey: any,
  queryFn: (context: QueryFunctionContext) => Promise<any>,
  options: any = {}
) => {
  const { onError }: any = options;

  return useQueryOrigin<any, Error>({
    queryKey,
    queryFn,
    ...options,
    useErrorBoundary: !onError,
  });
};
