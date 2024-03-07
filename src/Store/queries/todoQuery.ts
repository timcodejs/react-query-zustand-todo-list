import { useQuery } from '../../Business/hooks/useQuery';
import { useMutation } from '../../Business/hooks/useMutation';
import { posts } from '../../Utility/utils/queryKeys';
import {
  fetchTodoList,
  fetchTodoPost,
  fetchTodoDelete,
  fetchTodoUpdate,
} from '../../Utility/apis/fetchTodo';
import { useQueryClient } from '@tanstack/react-query';

export const useGetDataQuery = (pageLoad: boolean) => {
  const {
    data: postsDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(posts?.getData('getData').queryKey, () => fetchTodoList(), {
    enabled: !!pageLoad,
  });
  return { postsDatas, isLoading, isFetching, isError, error, refetch };
};

export const usePostDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.postData(json?.id).queryKey,
    () => fetchTodoPost(json),
    {
      // onMutate: async (variables: any) => {
      //   console.log('dsdsdsds', variables);

      //   // 요청한 Query 취소 함수
      //   // 즉 해당 Query에 대한 refetching을 막는 것 => onMutate에서 수행되는 것들을 덮어쓰지 않기 위해
      //   await queryClient.cancelQueries({
      //     queryKey: posts?.getData('getData').queryKey,
      //   });

      //   // 기존 Query를 가져오는 함수 ( 존재하지 않으면 undefinde 반환 )
      //   const previousValue = queryClient.getQueryData(
      //     posts?.getData('getData').queryKey
      //   );

      //   if (previousValue) {
      //     // setQueryData(): Query의 캐시된 데이터를 즉시 업데이트하는 동기 함수 ( Query가 존재하지 않으면 생성 )
      //     // 전달받은 variables값을 즉시 새로운 데이터로 업데이트
      //     queryClient.setQueryData(
      //       posts?.getData('getData').queryKey,
      //       (oldData: any) => [...oldData, variables]
      //     );
      //   }

      //   // 이전 값 리턴
      //   return { previousValue };
      // },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: posts?.getData('getData').queryKey,
        });
      },
      // onError: (err: Error, variables: any, context: any) => {
      //   console.log(err);
      //   if (context?.previousValue) {
      //     // error가 발생하면 onMutate에서 반환된 값으로 다시 롤백
      //     queryClient.setQueryData(
      //       posts?.getData('getData').queryKey,
      //       context.previousValue
      //     );
      //   }
      // },
    }
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useDeleteDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.deleteData(`deleteData`).queryKey,
    () => fetchTodoDelete(json),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: posts?.getData('getData').queryKey,
        });
      },
      onError: ({ err, variables, rollback }: any) => {
        console.log(err);
        rollback();
      },
    }
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useUpdateDataQuery = (json: any) => {
  const queryClient = useQueryClient();

  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.updateData(json?.id).queryKey,
    () => fetchTodoUpdate(json),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: posts?.getData('getData').queryKey,
        });
      },
      onError: ({ err, variables, rollback }: any) => {
        console.log(err);
        rollback();
      },
    }
  );

  return { data, mutate, isError, error, isSuccess };
};
