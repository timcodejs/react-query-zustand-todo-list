import { useCallback, useEffect, useState } from 'react';
import { useGetSearchDataQuery } from '../../Store/queries/searchQuery';

export const SearchViewModel = ({ btnRef, inputRef }: any) => {
  const [inputValue, setInputValue] = useState<string>('');

  // query
  const { searchDatas, status } = useGetSearchDataQuery(inputValue);

  useEffect(() => {
    if (btnRef?.current)
      if (
        inputRef?.current?.value !== '' &&
        inputRef?.current?.value !== undefined
      ) {
        btnRef.current.style.backgroundColor = '#191970';
      } else {
        btnRef.current.style.backgroundColor = '#8d8d8d';
      }
  }, [btnRef?.current, inputRef?.current?.value]);

  const onHandleList = (name: string) => {
    if (inputRef?.current) inputRef.current.value = name;
    setInputValue(name);
  };

  const debounce = (callback: any, duration: number) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), duration);
    };
  };

  const onChangeInput = useCallback(
    (e: any) => {
      debounce(setInputValue(e.target.value), 500);
    },
    [inputValue]
  );

  return { searchDatas, status, onChangeInput, onHandleList };
};
