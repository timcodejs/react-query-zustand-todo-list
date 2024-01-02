import styled from '@emotion/styled';
import editPNG from '../Assets/images/pen.png';
import checkPNG from '../Assets/images/check.png';
import deletePNG from '../Assets/images/delete.png';

const TodoList = ({
  item,
  isEdit,
  isEditObject,
  editInputRef,
  MainView,
  setIsEdit,
  setIsEditObject,
}: any) => {
  return (
    <Item key={item?.id}>
      {isEdit && isEditObject?.id === item.id ? (
        <input
          type='text'
          ref={editInputRef}
          defaultValue={item?.title}
          onChange={(v: any) => MainView?.handleEditChange(item, v)}
        />
      ) : (
        <div className='title'>{item?.title}</div>
      )}
      <div className='btn-container'>
        {isEdit && isEditObject?.id === item.id ? (
          <div className='btn c-btn' onClick={MainView?.handleEdit}>
            <img src={checkPNG} alt='체크 이미지' />
          </div>
        ) : (
          <div
            className='btn e-btn'
            onClick={() => {
              setIsEditObject(item);
              setIsEdit(true);
            }}
          >
            <img src={editPNG} alt='연필 이미지' />
          </div>
        )}

        <div className='btn x-btn' onClick={() => MainView?.handleRemove(item)}>
          <img src={deletePNG} alt='휴지통 이미지' />
        </div>
      </div>
    </Item>
  );
};

export default TodoList;

const Item = styled.div`
  display: flex;
  margin-bottom: 10px;

  .btn-container {
    display: flex;
    margin-left: 10px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -5px;
    margin-right: 5px;
    padding: 5px 6px;
    border-radius: 4px;
    cursor: pointer;
  }

  .c-btn {
    border: 1px solid rgb(0, 236, 66);
  }

  .e-btn {
    border: 1px solid rgb(38, 161, 244);
  }

  .x-btn {
    border: 1px solid rgb(252, 0, 5);
  }

  img {
    width: 15px;
  }
`;
