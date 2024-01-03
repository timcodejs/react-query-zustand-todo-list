import { useRef, useState } from 'react';
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

  // query
  const { postsDatas, isLoading, isError, error, refetch } = useGetDataQuery();
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
