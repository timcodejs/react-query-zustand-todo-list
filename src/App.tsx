import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import MainContainer from './Pages/MainContainer';
import LoginContainer from './Pages/LoginContainer';
import { AlertToast } from './Business/services/AlertToast';

function App() {
  AlertToast();

  return (
    <Header>
      <Routes>
        <Route path='/' element={<MainContainer />} />
        <Route path='/auth' element={<LoginContainer />} />
      </Routes>
    </Header>
  );
}

export default App;
