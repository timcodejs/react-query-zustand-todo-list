import { useQuery } from '../../Business/hooks/useQuery';
import { useMutation } from '../../Business/hooks/useMutation';
import { posts } from '../../Utility/utils/queryKeys';
import {
  fetchTodoList,
  fetchTodoPost,
  fetchTodoDelete,
  fetchTodoUpdate,
} from '../../Utility/apis/fetchTodo';

export const useGetDataQuery = () => {
  const {
    data: postsDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(posts?.getData('getData').queryKey, () => fetchTodoList());
  return { postsDatas, isLoading, isFetching, isError, error, refetch };
};

export const usePostDataQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.postData('postData').queryKey,
    () => fetchTodoPost(json)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useDeleteDataQuery = (id: number) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.deleteData('deleteData').queryKey,
    () => fetchTodoDelete(id)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useUpdateDataQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.updateData('updateData').queryKey,
    () => fetchTodoUpdate(json)
  );

  return { data, mutate, isError, error, isSuccess };
};
