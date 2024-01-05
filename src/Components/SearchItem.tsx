import styled from '@emotion/styled';

const SearchItem = ({ result }: any) => {
  return (
    <div>
      {result?.length > 0 ? (
        result?.map((item: any, idx: number) => {
          return (
            <Item key={idx}>
              <div className='book-image'>
                <img src={item.image} alt='책 이미지' />
              </div>
              <div className='book-text'>
                <div>
                  <strong>북&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명 :</strong>{' '}
                  {item.title}
                </div>
                <div>
                  <strong>저&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자 :</strong>{' '}
                  {item.author}
                </div>
                <div>
                  <strong>출&nbsp;판&nbsp;사 :</strong> {item.publisher}
                </div>
                <div>
                  <strong>설&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명 :</strong>
                  <div className='description'>{item.description}</div>
                </div>
              </div>
            </Item>
          );
        })
      ) : (
        <div>결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchItem;

const Item = styled.div`
  display: flex;
  width: 600px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;

  .book-image {
    width: 200px;
    img {
      width: 100%;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
    }
  }

  .book-text {
    width: 400px;
    margin-left: 10px;
    font-size: 18px;

    & > div {
      margin-bottom: 5px;
      line-height: 25px;
    }
  }

  .description {
    height: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
  }
`;
