import styled from '@emotion/styled';
import KakaoLogin from '../Components/KakaoLogin';
import NaverLogin from '../Components/NaverLogin';
import GoogleLogin from '../Components/GoogleLogin';
import { KakaoCallback } from '../Business/services/KakaoCallback';
import { NaverCallback } from '../Business/services/NaverCallback';
import { GoogleCallback } from '../Business/services/GoogleCallback';

const LoginContainer = () => {
  const kakao: any = KakaoCallback();
  const naver: any = NaverCallback();
  const google: any = GoogleCallback();

  if (kakao.onInfoData.isSuccess)
    return (
      <div>
        <div>
          카카오 로그인 성공! 환영합니다{' '}
          {kakao.onInfoData.data.properties.nickname}님
        </div>
        <Logout onClick={() => kakao.onLogoutData.mutate()}>로그아웃</Logout>
      </div>
    );
  if (naver?.isNaverLogin?.loginStatus?.status)
    return (
      <div>
        <div>
          네이버 로그인 성공! 환영합니다 {naver?.isNaverLogin?.user.getName()}님
        </div>
        <Logout onClick={naver?.naverLogout}>로그아웃</Logout>
      </div>
    );
  if (google?.isSuccess)
    return (
      <div>
        <div>구글 로그인 성공! 환영합니다 {google?.userData?.name}님</div>
        <Logout onClick={() => google.useGoogleLogout()}>로그아웃</Logout>
        <div style={{ display: 'none' }} id='naverIdLogin' />
      </div>
    );
  return (
    <>
      <Header>
        <div className='H1'>회원가입하기</div>
        <div className='H6'>소셜 로그인 및 이메일로 가입할 수 있습니다.</div>
      </Header>
      <KakaoLogin />
      <NaverLogin />
      <GoogleLogin onGoogleSocialLogin={google?.onGoogleSocialLogin} />
      <Other>
        <div className='other-line'>
          <div></div>
          <p>또는</p>
          <div></div>
        </div>
        <div className='other-sign'>ID/PW 회원가입</div>
      </Other>
    </>
  );
};

export default LoginContainer;

const Header = styled.div`
  width: 400px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .H1 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const Other = styled.div`
  .other-line {
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      width: 40px;
      text-align: center;
    }

    div {
      width: 180px;
      border-top: 1px solid #d9d9d9;
    }
  }
  .other-sign {
    width: 400px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d9d9d9;
    color: #4b4b4b;
    cursor: pointer;
  }
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 30px;
  color: #fff;
  background-color: red;
  cursor: pointer;
  margin-top: 10px;
`;
