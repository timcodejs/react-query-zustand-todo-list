import { useRef } from 'react';
import styled from '@emotion/styled';
import naverIcon from '../Assets/images/naver.png';

const NaverLogin = () => {
  const naverRef = useRef<any>();
  const handleNaverLogin = () => {
    naverRef?.current?.children[0]?.click();
  };

  return (
    <>
      <NaverIdLogin ref={naverRef} id='naverIdLogin' />
      <NaverLoginBtn onClick={handleNaverLogin}>
        <NaverIcon src={naverIcon} alt='navericon' />
        <NaverLoginTitle>네이버로 시작하기</NaverLoginTitle>
        <div style={{ width: '40px' }}></div>
      </NaverLoginBtn>
    </>
  );
};

export default NaverLogin;

const NaverIdLogin = styled.div`
  display: none;
`;

const NaverLoginBtn = styled.button`
  width: 400px;
  height: 60px;
  background-color: rgb(0, 191, 24);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  margin-top: 10px;
`;

const NaverIcon = styled.img`
  width: 40px;
`;

const NaverLoginTitle = styled.span`
  font-size: 18px;
  color: #fff;
`;
