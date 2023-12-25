import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { usePostStore } from '../Store/stores/postStore';
import { useAlertStore } from '../Store/stores/alertStore';
import {
  useGetDataQuery,
  usePostDataQuery,
  useDeleteDataQuery,
} from '../Store/queries/postQuery';

interface IData {
  id: number;
  title: string;
}

const MainContainer = () => {
  // hook
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    if (onDeleteData.isSuccess) {
      setHandler(onDeleteData?.data[0]);
      setAlertText('삭제');
    }
  }, [onDeleteData.isSuccess]);

  useEffect(() => {
    if (onSaveData.isSuccess || onDeleteData.isSuccess) refetch();
  }, [onSaveData.isSuccess, onDeleteData.isSuccess]);

  const handleChange = (e: any) => {
    setData({
      id: Math.floor(Math.random() * (100 - 4) + 4),
      title: e?.target?.value,
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

  if (isLoading) return <div>...loading</div>;
  if (isError) return <>{error?.message}</>;
  return (
    <div className='App'>
      {postsDatas?.map((e: any) => {
        return (
          <Item key={e?.id}>
            <div>{e?.title}</div>
            <div className='x-btn' onClick={() => handleRemove(e?.id)}>
              x
            </div>
          </Item>
        );
      })}
      <div>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type='text' onChange={handleChange} ref={inputRef} />
          <input type='submit' value='추가' />
        </form>
      </div>
    </div>
  );
};

export default MainContainer;

const Item = styled.div`
  width: 200px;
  display: flex;
  margin-bottom: 8px;

  .x-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    margin-top: -5px;
    margin-left: 10px;
    padding: 0px 6px;
    border: 1px solid red;
    border-radius: 4px;
    cursor: pointer;
  }
`;
