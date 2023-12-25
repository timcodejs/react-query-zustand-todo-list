import { useQuery } from '../../Business/hooks/useQuery';
import { useMutation } from '../../Business/hooks/useMutation';
import { posts } from '../../Utility/utils/queryKeys';

export const useGetDataQuery = () => {
  const {
    data: postsDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(posts?.getData('getData').queryKey, () =>
    fetch('/todos')
      .then((res: any) => res.json())
      .then((data) => data)
  );
  return { postsDatas, isLoading, isFetching, isError, error, refetch };
};

export const usePostDataQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.postData('postData').queryKey,
    () =>
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })
        .then((res: any) => res.json())
        .then((data) => data)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useDeleteDataQuery = (id: number) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.deleteData('deleteData').queryKey,
    () =>
      fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res: any) => res.json())
        .then((data) => data)
  );

  return { data, mutate, isError, error, isSuccess };
};

export const useUpdateDataQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    posts?.updateData('updateData').queryKey,
    () =>
      fetch(`/todos/${json?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })
        .then((res: any) => res.json())
        .then((data) => data)
  );

  return { data, mutate, isError, error, isSuccess };
};
