import { useQuery } from '../../Business/hooks/useQuery';
import { useMutation } from '../../Business/hooks/useMutation';
import { auths } from '../../Utility/utils/queryKeys';

export const useGetAuthQuery = () => {
  const {
    data: postsDatas,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(auths?.getAuth('getAuth').queryKey, () =>
    fetch('/auth')
      .then((res: any) => res.json())
      .then((data) => data)
  );
  return { postsDatas, isLoading, isFetching, isError, error, refetch };
};

export const usePostAuthQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.postAuth('postAuth').queryKey,
    () =>
      fetch('/auth', {
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

export const useDeleteAuthQuery = (id: number) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.deleteAuth('deleteAuth').queryKey,
    () =>
      fetch(`/auth/${id}`, {
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

export const useUpdateAuthQuery = (json: any) => {
  const { data, mutate, isError, error, isSuccess } = useMutation(
    auths?.updateAuth('updateAuth').queryKey,
    () =>
      fetch(`/auth/${json?.id}`, {
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
