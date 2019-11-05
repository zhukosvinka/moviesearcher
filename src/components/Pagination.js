import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PageInformation = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: #393939;
`;

const Button = styled(Link)`
  display: block;
  font-size: initial;
  font-weight: 600;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  margin-top: 14px;
  color: #232323;
  opacity: 0.5;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;

const Pagination = ({ totalPages, currentPage, currentUrl }) => {
  const nextPageNumber = Number(currentPage) === totalPages ? currentPage : Number(currentPage) + 1;

  const prevPageNumber = Number(currentPage) === 1 ? '1' : Number(currentPage) - 1;

  return (
    <Wrapper>
      <Button to={currentUrl.replace(/\d+$/gi, prevPageNumber)}>{'<'}</Button>
      <PageInformation>
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </PageInformation>
      <Button to={currentUrl.replace(/\d+$/gi, nextPageNumber)}>{'>'}</Button>
    </Wrapper>
  );
};

export default Pagination;
