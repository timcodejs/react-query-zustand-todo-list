import { useEffect, useState } from 'react';
import { usePostStore } from '../../Store/stores/postStore';
import { useAlertStore } from '../../Store/stores/alertStore';
import {
  usePostDataQuery,
  useDeleteDataQuery,
  useUpdateDataQuery,
} from '../../Store/queries/todoQuery';
import { IData, MainViewModelData } from '../../Utility/utils/Types';

export const MainViewModel = ({
  btnRef,
  inputRef,
  setIsEditObject,
  setIsEdit,
  refetch,
}: MainViewModelData) => {
  const [data, setData] = useState<IData>({
    id: 0,
    title: '',
  });

  // store
  const { setHandler } = usePostStore();
  const { setAlertText } = useAlertStore();

  // query
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(data);
  const onUpdateData = useUpdateDataQuery(data);

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
    setData,
    handleChange,
    handleEditChange,
    handleSubmit,
    handleRemove,
    handleEdit,
    onSaveData,
    onDeleteData,
    onUpdateData,
  };
};
