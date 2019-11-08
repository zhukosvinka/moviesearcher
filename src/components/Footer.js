import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  background-color: #232323;
  height: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  flex-direction: column;
`;

const Link = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Link href={'https://github.com/padoctb'}> GitHub</Link>
      <Link href={'https://developers.themoviedb.org/3/'}>API</Link>
    </Wrapper>
  );
};

export default Footer;
