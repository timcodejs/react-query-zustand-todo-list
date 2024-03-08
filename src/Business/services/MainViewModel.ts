import { useEffect, useRef, useState } from 'react';
import { usePostStore } from '../../Store/stores/postStore';
import { useAlertStore } from '../../Store/stores/alertStore';
import {
  usePostDataQuery,
  useDeleteDataQuery,
  useUpdateDataQuery,
  useGetDataQuery,
} from '../../Store/queries/todoQuery';
import { IData } from '../../Utility/utils/Types';

export const MainViewModel = () => {
  const btnRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditObject, setIsEditObject] = useState<IData>();
  const [pageLoad, setPageLoad] = useState<boolean>(false);
  const [data, setData] = useState<IData>({
    id: 0,
    title: '',
  });

  // store
  const { setHandler } = usePostStore();
  const { setAlertText } = useAlertStore();

  // query
  const { postsDatas, isLoading, isError, error, refetch } =
    useGetDataQuery(pageLoad);
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(data);
  const onUpdateData = useUpdateDataQuery(data);

  useEffect(() => {
    const time = setTimeout(() => {
      setPageLoad(true);
    }, 3000);

    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    if (btnRef?.current)
      if (
        inputRef?.current?.value !== '' &&
        inputRef?.current?.value !== undefined
      ) {
        btnRef.current.style.backgroundColor = '#191970';
      } else {
        btnRef.current.style.backgroundColor = '#8d8d8d';
      }
  }, [btnRef?.current, inputRef?.current?.value]);

  useEffect(() => {
    if (onDeleteData?.isSuccess) {
      setHandler(onDeleteData?.data[0]);
      setAlertText('삭제');
    }
  }, [onDeleteData?.isSuccess]);

  useEffect(() => {
    if (onUpdateData?.isSuccess) {
      setHandler(onUpdateData?.data);
      setAlertText('수정');
    }
  }, [onUpdateData?.isSuccess]);

  const handleChange = (e: any) => {
    setData({
      id: Math.floor(Math.random() * (100 - 4) + 4),
      title: e?.target?.value,
    });
  };

  const handleEditChange = (e: any, v: any) => {
    setData({
      id: e.id,
      title: v.target.value,
    });
  };

  const handleSubmit = () => {
    if (inputRef?.current?.value !== '') {
      onSaveData.mutate(data);
      setHandler(data);
      setAlertText('추가');
    } else {
      setHandler({ title: 'void' });
    }
    if (inputRef?.current) inputRef.current.value = '';
  };

  const handleRemove = (e: any) => {
    setData({
      id: e.id,
      title: e.title,
    });
    onDeleteData.mutate(data);
  };

  const handleEdit = () => {
    onUpdateData.mutate(data);
    setIsEditObject(undefined);
    setIsEdit(false);
  };

  return {
    data,
    isEdit,
    isEditObject,
    btnRef,
    inputRef,
    editInputRef,
    pageLoad,
    onSaveData,
    onDeleteData,
    onUpdateData,
    postsDatas,
    isLoading,
    isError,
    error,
    setData,
    setIsEdit,
    setIsEditObject,
    handleChange,
    handleEditChange,
    handleSubmit,
    handleRemove,
    handleEdit,
  };
};
