import styled from '@emotion/styled';
import kakaoIcon from '../Assets/images/kakao.png';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const onKakaoSocialLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  };

  return (
    <Kakao onClick={onKakaoSocialLogin}>
      <div className='align'>
        <img src={kakaoIcon} alt='카카오 아이콘' />
        <div className='text'>카카오로 시작하기</div>
        <div style={{ width: '25px' }}></div>
      </div>
    </Kakao>
  );
};

export default KakaoLogin;

const Kakao = styled.div`
  width: 400px;
  height: 60px;
  background-color: rgb(252, 236, 79);
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
