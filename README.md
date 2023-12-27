# react-query (src/Store/queries)

- queryKey를 편리하게 관리하기 위해 query-key-factory 라이브러리를 사용하여 관리.
  (src/Utility/utils/queryKeys.ts)
- 재사용에 용이하게 하기 위헤 커스텀 useQuery.ts, useMutation.ts 생성. (src/Business/hooks)

# zustand (src/Store/stores)

- 서버 상태를 담당하는 react-query를 사용하게되며 redux, mobX 등에 비해 가벼워진 클라이언트 state 라이브러리로 바꿔보고자 적용.
- store 및 middleware 선언없이 파일 내에 create 객체를 사용하여 store 생성이 가능한 점이 장점.
- 초기값 선언, 값을 조작하는 함수 선언, 함수를 선언할 땐 zustand의 set 파라미터를 사용하여 값 업데이트.

```
import { create } from 'zustand';
export const usePostStore = create((set) => ({
  handler: "",
  setHandler: (handler) => set(() => ({ handler: handler })),
}));

```

# Mock Service Worker (src/Mocks/handlers.js)

- 서버 코드 없이 data fetching을 테스트하기 위해 Mock Service Worker(msw) 라이브러리를 사용하여 테스트 진행.
- 버전 변경에 따른 msw 라이브러리의 rest 객체 대신 http 객체 사용.
- 임의의 객체 데이터를 만들고(data.json) handlers.js에서 불러와 적용.
- fetch API 응답을 대체하기 위해 msw의 HttpResponse 클래스를 사용하여 서버 응답 return.

```
import { http, HttpResponse } from 'msw';
export const handlers = [
  http.get(url, () => {
    return HttpResponse.json(Array.from(data.todos.values()));
  }),
  ...
];
```

- axios 등 비동기 라이브러리가 충돌이 날 가능성이 있어 fetch API를 사용하여 테스트 진행.
- 서비스 워커 등록 (npx msw init public/ --save)
- 프로젝트 실행 후 콘솔 화면에 "[MSW] Mocking enabled." 가 뜨면 연결 성공.
