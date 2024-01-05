import { useRef } from 'react';
import SearchList from '../Components/SearchList';
import SearchInput from '../Components/SearchInput';
import { SearchViewModel } from '../Business/services/SearchViewModel';

const SearchContainer = () => {
  const btnRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { searchDatas, status, onChangeInput, onHandleList } = SearchViewModel({
    btnRef,
    inputRef,
  });

  return (
    <div>
      <SearchInput
        btnRef={btnRef}
        inputRef={inputRef}
        onChangeInput={onChangeInput}
      />
      <SearchList
        status={status}
        searchDatas={searchDatas}
        onHandleList={onHandleList}
      />
    </div>
  );
};

export default SearchContainer;
