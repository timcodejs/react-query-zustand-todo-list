import styled from '@emotion/styled';

const TodoInput = ({ isEdit, MainView, inputRef }: any) => {
  return (
    <Input>
      {!isEdit && (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            MainView?.handleSubmit();
          }}
        >
          <input
            className='input-text'
            type='text'
            onChange={MainView?.handleChange}
            ref={inputRef}
          />
          <input className='input-btn' type='submit' value='할 일 추가' />
        </form>
      )}
    </Input>
  );
};

export default TodoInput;

const Input = styled.div`
  height: 60px;

  .input-text {
    width: 150px;
    height: 25px;
    margin-right: 5px;
    border: 1px solid #8d8d8d;
    border-radius: 5px;
    padding-left: 10px;
  }

  .input-btn {
    height: 30px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: #8d8d8d;
    cursor: pointer;
  }
`;
