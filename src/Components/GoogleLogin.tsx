import styled from '@emotion/styled';
import googleIcon from '../Assets/images/google.png';

interface GoogleType {
  onGoogleSocialLogin: (e: any) => void;
}

const GoogleLogin = ({ onGoogleSocialLogin }: GoogleType) => {
  return (
    <Google onClick={onGoogleSocialLogin}>
      <div className='align'>
        <img src={googleIcon} alt='구글 아이콘' />
        <div className='text'>구글로 시작하기</div>
        <div style={{ width: '25px' }}></div>
      </div>
    </Google>
  );
};

export default GoogleLogin;

const Google = styled.div`
  width: 400px;
  height: 60px;
  border: 1px solid #bababa;
  box-sizing: border-box;
  cursor: pointer;
  margin-top: 10px;

  .align {
    height: 60px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 18px;
  }

  img {
    width: 25px;
  }
`;
