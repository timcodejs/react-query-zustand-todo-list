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
        <div onClick={() => navigation('/')}>할일</div>
        <div onClick={() => navigation('/auth')}>로그인</div>
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
    width: 100px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
`;
