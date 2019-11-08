import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  height: 60px;
  background-color: ${({ theme }) => (theme.isDarkModeEnable ? '#292929' : '#3F7FBF')};
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <HeaderLink to="/moviesearcher">React Movie Searcher</HeaderLink>
  </HeaderWrapper>
);

export default Header;
