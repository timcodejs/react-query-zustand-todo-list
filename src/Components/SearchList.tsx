import styled from '@emotion/styled';

const SearchList = ({ status, isEnter, searchDatas, onHandleList }: any) => {
  const getDataByStatus = () => {
    switch (status) {
      case 'loading':
        return <div>Loading</div>;
      case 'error':
        return <span>Error: {status?.error.message}</span>;
      default:
        return (
          <>
            {isEnter === true && (
              <ResultWrap>
                <div>
                  <div className='recommend-text'>추천 검색어</div>
                  {searchDatas?.items?.map((item: any, idx: number) => {
                    return (
                      <li
                        key={idx}
                        value={item.title}
                        onClick={() => onHandleList(item.title)}
                      >
                        {item.title}
                      </li>
                    );
                  })}
                </div>
              </ResultWrap>
            )}
          </>
        );
    }
  };

  return searchDatas ? <div>{getDataByStatus()}</div> : null;
};

export default SearchList;

const ResultWrap = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  width: 500px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 15px;
  list-style: none;

  & > div {
    margin: 20px;
  }

  .recommend-text {
    color: #7b7b7b;
    margin-bottom: 10px;
  }

  li {
    padding: 10px 0;
    border-bottom: 1px solid #d9d9d9;
  }
`;
