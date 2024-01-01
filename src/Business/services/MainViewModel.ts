import { useEffect, useState } from 'react';
import { usePostActions } from '../../Store/stores/postStore';
import { useAlertActions } from '../../Store/stores/alertStore';
import {
  usePostDataQuery,
  useDeleteDataQuery,
  useUpdateDataQuery,
} from '../../Store/queries/todoQuery';
import { IData, MainViewModelData } from '../../Utility/utils/Types';

export const MainViewModel = ({
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
  const { setHandler } = usePostActions();
  const { setAlertText } = useAlertActions();

  // query
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(data);
  const onUpdateData = useUpdateDataQuery(data);

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

  useEffect(() => {
    if (
      onSaveData?.isSuccess ||
      onDeleteData?.isSuccess ||
      onUpdateData?.isSuccess
    )
      refetch();
  }, [onSaveData.isSuccess, onDeleteData.isSuccess, onUpdateData.isSuccess]);

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
      onSaveData.mutate();
      setHandler(data);
      setAlertText('추가');
    }
    if (inputRef?.current) inputRef.current.value = '';
  };

  const handleRemove = (e: any) => {
    setData({
      id: e.id,
      title: e.title,
    });
    onDeleteData.mutate();
  };

  const handleEdit = () => {
    onUpdateData.mutate();
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
