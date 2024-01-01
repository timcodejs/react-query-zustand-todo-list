import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../Utility/utils/Types';
import { useGetDataQuery } from '../Store/queries/todoQuery';
import { MainViewModel } from '../Business/services/MainViewModel';
import editPNG from '../Assets/images/pen.png';
import checkPNG from '../Assets/images/check.png';
import deletePNG from '../Assets/images/delete.png';

const MainContainer = () => {
  // hook
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditObject, setIsEditObject] = useState<IData>();

  // query
  const { postsDatas, isLoading, isError, error, refetch } = useGetDataQuery();
  const MainView = MainViewModel({ inputRef, setIsEditObject, setIsEdit });

  useEffect(() => {
    if (
      MainView?.onSaveData?.isSuccess ||
      MainView?.onDeleteData?.isSuccess ||
      MainView?.onUpdateData?.isSuccess
    )
      refetch();
  }, [
    MainView?.onSaveData.isSuccess,
    MainView?.onDeleteData.isSuccess,
    MainView?.onUpdateData.isSuccess,
  ]);

  if (isLoading) return <div>...loading</div>;
  if (isError) return <>{error?.message}</>;
  return (
    <div className='App'>
      <Input>
        {!isEdit && (
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              MainView?.handleSubmit();
            }}
          >
            <input
              className='input-text'
              type='text'
              onChange={MainView?.handleChange}
              ref={inputRef}
            />
            <input className='input-btn' type='submit' value='할 일 추가' />
          </form>
        )}
      </Input>
      {postsDatas?.map((e: any) => {
        return (
          <Item key={e?.id}>
            {isEdit && isEditObject?.id === e.id ? (
              <input
                type='text'
                ref={editInputRef}
                defaultValue={e?.title}
                onChange={(v: any) => MainView?.handleEditChange(e, v)}
              />
            ) : (
              <div>{e?.title}</div>
            )}
            <div className='btn-container'>
              {isEdit && isEditObject?.id === e.id ? (
                <div className='btn c-btn' onClick={MainView?.handleEdit}>
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

              <div
                className='btn x-btn'
                onClick={() => MainView?.handleRemove(e?.id)}
              >
                <img src={deletePNG} alt='휴지통 이미지' />
              </div>
            </div>
          </Item>
        );
      })}
    </div>
  );
};

export default MainContainer;

const Input = styled.div`
  height: 60px;

  .input-text {
    width: 150px;
    height: 25px;
    margin-right: 5px;
    border: 1px solid #8d8d8d;
    border-radius: 5px;
    padding-left: 10px;
  }

  .input-btn {
    height: 30px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: #8d8d8d;
    cursor: pointer;
  }
`;

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
