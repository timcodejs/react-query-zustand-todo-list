import styled from '@emotion/styled';

const SearchInput = ({ btnRef, inputRef, onChangeInput }: any) => {
  return (
    <Input>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
        }}
      >
        <div>
          <input
            ref={inputRef}
            type='text'
            className='input-text'
            placeholder='네이버 책 검색 ex) 위대한 개츠비..'
            onChange={onChangeInput}
          />
        </div>
        <div>
          <input
            ref={btnRef}
            className='input-btn'
            type='submit'
            value='검색'
          />
        </div>
      </form>
    </Input>
  );
};

export default SearchInput;

const Input = styled.div`
  height: 60px;

  form {
    display: flex;
  }

  input:focus {
    outline: none;
  }

  .input-text {
    width: 500px;
    height: 50px;
    border: 1px solid #8d8d8d;
    box-sizing: border-box;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding-left: 15px;
    font-size: 20px;
  }

  .input-btn {
    width: 80px;
    height: 50px;
    color: #fff;
    border: 0;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    font-size: 16px;
    background-color: #8d8d8d;
    cursor: pointer;
  }
`;
