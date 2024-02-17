import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Header from './Components/Header';
import MainContainer from './Pages/MainContainer';
import LoginContainer from './Pages/LoginContainer';
import ScrollContainer from './Pages/ScrollContainer';
import SearchContainer from './Pages/SearchContainer';
import UploadContainer from './Pages/UploadContainer';
import { AlertToast } from './Business/services/AlertToast';

function App() {
  AlertToast();

  return (
    <Header>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Routes>
              <Route path='/' element={<MainContainer />} />
              <Route path='/oauth' element={<LoginContainer />} />
              <Route path='/scroll' element={<ScrollContainer />} />
              <Route path='/search' element={<SearchContainer />} />
              <Route path='/upload' element={<UploadContainer />} />
            </Routes>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Header>
  );
}

export default App;
