import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../Utility/utils/Types';
import { useGetDataQuery } from '../Store/queries/todoQuery';
import { MainViewModel } from '../Business/services/MainViewModel';
import TodoInput from '../Components/TodoInput';
import TodoList from '../Components/TodoList';

const MainContainer = () => {
  // hook
  const btnRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditObject, setIsEditObject] = useState<IData>();
  const [pageLoad, setPageLoad] = useState<boolean>(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setPageLoad(true);
    }, 3000);

    return () => clearTimeout(time);
  }, []);

  // query
  const { postsDatas, isLoading, isError, error, refetch } =
    useGetDataQuery(pageLoad);
  const MainView = MainViewModel({
    btnRef,
    inputRef,
    setIsEditObject,
    setIsEdit,
    refetch,
  });

  if (isLoading) return <div>...loading</div>;
  if (isError) return <>{error?.message}</>;
  return (
    <div>
      {!pageLoad && <Loading />}
      <TodoInput
        isEdit={isEdit}
        MainView={MainView}
        inputRef={inputRef}
        btnRef={btnRef}
      />
      {postsDatas?.map((item: any) => {
        return (
          <TodoList
            key={item?.id}
            item={item}
            isEdit={isEdit}
            isEditObject={isEditObject}
            editInputRef={editInputRef}
            MainView={MainView}
            setIsEdit={setIsEdit}
            setIsEditObject={setIsEditObject}
          />
        );
      })}
    </div>
  );
};

export default MainContainer;

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
