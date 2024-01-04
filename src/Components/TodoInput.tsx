import styled from '@emotion/styled';

const TodoInput = ({ isEdit, MainView, inputRef, btnRef }: any) => {
  return (
    <Input>
      {!isEdit && (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            MainView?.handleSubmit();
          }}
        >
          <div>
            <input
              className='input-text'
              type='text'
              onChange={MainView?.handleChange}
              ref={inputRef}
            />
          </div>
          <div>
            <input
              ref={btnRef}
              className='input-btn'
              type='submit'
              value='할 일 추가'
            />
          </div>
        </form>
      )}
    </Input>
  );
};

export default TodoInput;

const Input = styled.div`
  height: 60px;

  form {
    display: flex;
  }

  .input-text {
    width: 500px;
    height: 40px;
    margin-right: 5px;
    border: 1px solid #8d8d8d;
    box-sizing: border-box;
    border-radius: 5px;
    padding-left: 10px;
    font-size: 20px;
  }

  .input-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    background-color: #8d8d8d;
    cursor: pointer;
  }
`;
