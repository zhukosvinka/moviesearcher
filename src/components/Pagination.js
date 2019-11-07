import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import withLocalization from '../hocs/withLocalization';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 400px;
`;

const PagesRange = styled.div`
  font-size: 16px;
  color: #393939;
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Page = styled(Link)`
  display: block;
  color: #393939;
  text-decoration: none;
  font-size: 18px;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  padding: 8px 0;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#e3e3e3' : '#fff')};
  text-align: center;
  flex-grow: 1;
  &:hover {
    background-color: #e3e3e3;
  }
  &:last-child {
    border-right: 1px solid #e3e3e3;
  }
  &:first-child {
    border-left: 1px solid #e3e3e3;
  }
`;

const Button = styled(Link)`
  display: block;
  font-size: initial;
  font-weight: 600;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
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
  const paginationRange = 4;

  const rightSidePages =
    totalPages - +currentPage >= paginationRange ? paginationRange : totalPages - +currentPage;

  const leftSidePages = +currentPage - paginationRange > 0 ? paginationRange : +currentPage - 1;

  const pages = [+currentPage];

  for (let i = 0; i < rightSidePages; i++) {
    pages.push(i + 1 + +currentPage);
  }

  for (let i = 0; i < leftSidePages; i++) {
    pages.unshift(+currentPage - i - 1);
  }

  return (
    <Wrapper>
      <Button to={currentUrl.replace(/\d+$/gi, 1)}>{'<<'}</Button>
      <PagesRange>
        {pages.map(pageNumber => (
          <Page
            to={currentUrl.replace(/\d+$/gi, pageNumber)}
            isActive={pageNumber === +currentPage}
            key={pageNumber}
          >
            {pageNumber}
          </Page>
        ))}
      </PagesRange>
      <Button to={currentUrl.replace(/\d+$/gi, totalPages)}>{'>>'}</Button>
    </Wrapper>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
};

export default withLocalization(Pagination);
