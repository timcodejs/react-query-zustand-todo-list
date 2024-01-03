import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { worker } from './Mocks/worker';
import 'react-toastify/dist/ReactToastify.css';

if (process.env.NODE_ENV === 'development') worker.start();

const googleClientId: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * defaultOptions queries
 * @param retry API가 실패하면 설정한 값만큼 재시도 하는 옵션(react query는 기본적으로 요청이 실패하면 3번의 재시도를 거치기 때문에 retry는 0으로 세팅)
 *
 * @param gcTime default 3분. 캐싱 유지 시간.
 *                  캐시 구조에 저장된 데이터는 메모리상에 존재하게 된다. 이 때, 메모리에 저장되어 있는 캐시 데이터가 언제까지 유지될지를 말해주는 옵션.
 *                  언마운트된 후 어느 시점까지 메모리에 데이터를 저장하여 캐싱할 것인지를 결정. 시간이 지나면 가비지 컬렉팅 된다.
 *
 * @param staleTime default 0초. 전달받은 데이터는 리엑트 쿼리의 자료구조 내용 중 캐시에 저장이 되는데,
 *                  이때 이 캐시데이터의 "신선한 상태" 가 언제까지 유지될 지를 말해주는 옵션.
 *                  신선하다 함은, 서버에서 조회한 데이터는 그때 당시의 데이터 snapshot이고,
 *                  외부 요청으로 서버 데이터가 변경이 되었다면 내 브라우저가 가진 데이터는
 *                  이미 오래된 낡은 데이터가 되었으므로 stale하다고 말하는 것.
 *                  useQuery를 호출할 당시에 옵션으로 staletime을 따로 지정해주지 않았었다면,
 *                  항상 캐싱되어 있는 데이터는 stale하다고 여기기 때문에 refetching을 하게 되어 서버에 계속적인 요청을 하게된다.
 *
 *                  inactive -> fetching -> fresh -> stale
 *                  fresh 상태일 때 서버 데이터를 변경해도 화면에는 변화가 없다.
 *                  데이터가 stale 상태가 되면 백그라운드에서 일어나는 isFetching을 제어하여 변경된 데이터가 적용된다.
 *                  그 후 다시 fetching 상태로 가고 fresh 상태로 가게된다.
 *
 * @param refetchOnMount default true. stale 상태에서 다른 페이지에 갔다가 다시 돌어오면 즉, 마운트될 때 isFetching 값이 true로 바뀌면서 fetching이 일어난다.(refetch)
 *                       값을 false로 설정하면 마운트 됐을 때 refetch가 일어나지 않는다.
 *                       값을 'always'로 설정하면 staleTime 값과 상관없이 항상 refetch가 일어난다.
 *
 * @param refetchOnWindowFocus default true. 브라우저가 활성화 되었느냐 아니냐에 따라 refetch 방식을 결정.
 *
 * @param refetchInterval default false. 시간을 설정하면 해당 시간마다 강제로 refetch한다.(Polling) ex) 주식 거래 앱
 *
 * @param refetchIntervalInBackground default false. 값을 true로 설정하면 앱이 비활성화 되었더라도 백그라운드에서 fetching 작업이 계속 일어난다.
 *
 * @param queryCache 전역에서 query chche 핸들링 설정
 *
 * @param mutationCache 전역에서 mutation chche 핸들링 설정
 *
 * @param useErrorBoundary Fallback UI 설정에 대한 옵션.
 *
 * @param enabled default true. 동기적으로 실행되게 해주는 옵션.
 *                false일 경우, 초기 마운트시에 해당 useQuery가 마치 useEffect처럼 첫 마운트시 함수 호출을 하고, 실패했을 때는 계속 retry를 한다.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: 1000,
      // refetchIntervalInBackground: true,
      // enabled: false,
    },
    mutations: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({}),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
