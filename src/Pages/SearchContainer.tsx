import { useRef } from 'react';
import SearchItem from '../Components/SearchItem';
import SearchList from '../Components/SearchList';
import SearchInput from '../Components/SearchInput';
import { SearchViewModel } from '../Business/services/SearchViewModel';

const SearchContainer = () => {
  const btnRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    searchDatas,
    status,
    result,
    isEnter,
    onChangeInput,
    onHandleList,
    handleSubmit,
  } = SearchViewModel({
    btnRef,
    inputRef,
  });

  return (
    <div>
      <SearchInput
        btnRef={btnRef}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        onChangeInput={onChangeInput}
      />
      <SearchList
        status={status}
        isEnter={isEnter}
        searchDatas={searchDatas}
        onHandleList={onHandleList}
      />
      <SearchItem result={result} />
    </div>
  );
};

export default SearchContainer;
