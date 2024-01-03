import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

type WrapperProps = {
  children: React.ReactNode;
};

const Header = ({ children }: WrapperProps) => {
  const navigation = useNavigate();
  return (
    <>
      <HeaderNav>
        <div onClick={() => navigation('/')}>할 일</div>
        <div onClick={() => navigation('/scroll')}>스크롤 테스트</div>
        <div onClick={() => navigation('/oauth')}>소셜 로그인</div>
      </HeaderNav>
      {children}
    </>
  );
};

export default Header;

const HeaderNav = styled.div`
  display: flex;
  margin-bottom: 20px;

  & > div {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    margin: 0 15px;
    cursor: pointer;
  }
`;
