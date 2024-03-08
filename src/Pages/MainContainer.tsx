import styled from '@emotion/styled';
import TodoInput from '../Components/TodoInput';
import TodoList from '../Components/TodoList';
import { MainViewModel } from '../Business/services/MainViewModel';

const MainContainer = () => {
  const MainView = MainViewModel();

  if (MainView?.isLoading) return <div>...loading</div>;
  if (MainView?.isError) return <>{MainView?.error?.message}</>;
  return (
    <div>
      {!MainView?.pageLoad && <Loading />}
      <TodoInput MainView={MainView} />
      {MainView?.postsDatas?.map((item: any) => {
        return <TodoList key={item?.id} item={item} MainView={MainView} />;
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
