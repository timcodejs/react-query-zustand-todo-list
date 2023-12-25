import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import MainContainer from './Pages/MainContainer';
import TodoContainer from './Pages/TodoContainer';
import DetailContainer from './Pages/DetailContainer';
import { AlertToast } from './Business/services/AlertToast';

function App() {
  AlertToast();

  return (
    <Header>
      <Routes>
        <Route path='/' element={<MainContainer />} />
        <Route path='/todo' element={<TodoContainer />} />
        <Route path='/todo/detail/:id' element={<DetailContainer />} />
      </Routes>
    </Header>
  );
}

export default App;
