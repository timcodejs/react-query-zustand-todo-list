import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { usePostStore } from '../Store/stores/postStore';
import { useAlertStore } from '../Store/stores/alertStore';
import {
  useGetDataQuery,
  usePostDataQuery,
  useDeleteDataQuery,
  useUpdateDataQuery,
} from '../Store/queries/postQuery';
import editPNG from '../Assets/images/pen.png';
import checkPNG from '../Assets/images/check.png';
import deletePNG from '../Assets/images/delete.png';

interface IData {
  id: number;
  title: string | undefined;
}

const MainContainer = () => {
  // hook
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditObject, setIsEditObject] = useState<IData>();
  const [selectId, setSelectId] = useState<number>(0);
  const [data, setData] = useState<IData>({
    id: 0,
    title: '',
  });

  // store
  const { setHandler } = usePostStore();
  const { setAlertText } = useAlertStore();

  // query
  const { postsDatas, isLoading, isError, error, refetch } = useGetDataQuery();
  const onSaveData = usePostDataQuery(data);
  const onDeleteData = useDeleteDataQuery(selectId);
  const onUpdateData = useUpdateDataQuery(data);

  useEffect(() => {
    if (onDeleteData.isSuccess) {
      setHandler(onDeleteData?.data[0]);
      setAlertText('삭제');
    }
  }, [onDeleteData.isSuccess]);

  useEffect(() => {
    if (onUpdateData.isSuccess) {
      setHandler(onUpdateData?.data);
      setAlertText('수정');
    }
  }, [onUpdateData.isSuccess]);

  useEffect(() => {
    if (
      onSaveData.isSuccess ||
      onDeleteData.isSuccess ||
      onUpdateData.isSuccess
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

  const handleRemove = (id: number) => {
    setSelectId(id);
    onDeleteData.mutate();
  };

  const handleEdit = (e: any) => {
    onUpdateData.mutate();
    setIsEditObject(undefined);
    setIsEdit(false);
  };

  if (isLoading) return <div>...loading</div>;
  if (isError) return <>{error?.message}</>;
  return (
    <div className='App'>
      {postsDatas?.map((e: any) => {
        return (
          <Item key={e?.id}>
            {isEdit && isEditObject?.id === e.id ? (
              <input
                type='text'
                ref={editInputRef}
                defaultValue={e?.title}
                onChange={(v: any) => handleEditChange(e, v)}
              />
            ) : (
              <div>{e?.title}</div>
            )}
            <div className='btn-container'>
              {isEdit && isEditObject?.id === e.id ? (
                <div className='btn c-btn' onClick={handleEdit}>
                  <img src={checkPNG} alt='체크 이미지' />
                </div>
              ) : (
                <div
                  className='btn e-btn'
                  onClick={() => {
                    setIsEditObject(e);
                    setIsEdit(true);
                  }}
                >
                  <img src={editPNG} alt='연필 이미지' />
                </div>
              )}

              <div className='btn x-btn' onClick={() => handleRemove(e?.id)}>
                <img src={deletePNG} alt='휴지통 이미지' />
              </div>
            </div>
          </Item>
        );
      })}
      <div>
        {!isEdit && (
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type='text' onChange={handleChange} ref={inputRef} />
            <input type='submit' value='추가' />
          </form>
        )}
      </div>
    </div>
  );
};

export default MainContainer;

const Item = styled.div`
  display: flex;
  margin-bottom: 8px;

  .btn-container {
    display: flex;
    margin-left: 10px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5px;
    margin-right: 5px;
    padding: 5px 6px;
    border-radius: 4px;
    cursor: pointer;
  }

  .c-btn {
    border: 1px solid rgb(0, 236, 66);
  }

  .e-btn {
    border: 1px solid rgb(38, 161, 244);
  }

  .x-btn {
    border: 1px solid rgb(252, 0, 5);
  }

  img {
    width: 15px;
  }
`;
