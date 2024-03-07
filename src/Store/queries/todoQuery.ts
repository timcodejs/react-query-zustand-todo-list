import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchTodoList,
  fetchTodoPost,
  fetchTodoDelete,
  fetchTodoUpdate,
} from '../../Utility/apis/fetchTodo';

export const useGetDataQuery = (pageLoad: boolean) => {
  const {
    data: postsDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getData'],
    queryFn: () => fetchTodoList(),
    enabled: !!pageLoad,
  });
  return { postsDatas, isLoading, isFetching, isError, error, refetch };
};

export const usePostDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ['postData', json?.id],
    mutationFn: () => fetchTodoPost(json),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['getData'] });
    // },
    onMutate: async (variables: any) => {
      // 요청한 Query 취소 함수
      // 즉 해당 Query에 대한 refetching을 막는 것 => onMutate에서 수행되는 것들을 덮어쓰지 않기 위해
      await queryClient.cancelQueries({ queryKey: ['getData'] });

      // 기존 Query를 가져오는 함수 ( 존재하지 않으면 undefinde 반환 )
      const previousValue = queryClient.getQueryData(['getData']);

      if (previousValue) {
        // setQueryData(): Query의 캐시된 데이터를 즉시 업데이트하는 동기 함수 ( Query가 존재하지 않으면 생성 )
        // 전달받은 variables값을 즉시 새로운 데이터로 업데이트
        queryClient.setQueryData(['getData'], (oldData: any) => [
          ...oldData,
          variables,
        ]);
      }

      // 이전 값 리턴
      return { previousValue };
    },
    onError: (err: Error, variables: any, context: any) => {
      console.log(err);
      if (context?.previousValue) {
        // error가 발생하면 onMutate에서 반환된 값으로 다시 롤백
        queryClient.setQueryData(['getData'], context.previousValue);
      }
    },
    onSettled: () => {
      // 'getData' 쿼리를 무효화시켜서 쿼리를 다시 fetching
      queryClient.invalidateQueries({ queryKey: ['getData'] });
    },
  });

  return { data, mutate, isError, error, isSuccess };
};

export const useDeleteDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ['deleteData', json?.id],
    mutationFn: () => fetchTodoDelete(json),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getData'] });
    },
    onError: (err: Error, variables: any, context: any) => {
      if (context?.previousValue) {
        queryClient.setQueryData(['getData'], context.previousValue);
      }
    },
  });

  return { data, mutate, isError, error, isSuccess };
};

export const useUpdateDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation({
    mutationKey: ['updateData', json?.id],
    mutationFn: () => fetchTodoUpdate(json),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getData'] });
    },
    onError: (err: Error, variables: any, context: any) => {
      if (context?.previousValue) {
        queryClient.setQueryData(['getData'], context.previousValue);
      }
    },
  });

  return { data, mutate, isError, error, isSuccess };
};
