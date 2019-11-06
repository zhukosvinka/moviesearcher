import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import withLocalization from '../hocs/withLocalization'

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

const Pagination = ({ totalPages, currentPage, currentUrl, localizeText }) => {
  const nextPageNumber = +currentPage === totalPages ? currentPage : +currentPage + 1;

  const prevPageNumber = +currentPage === 1 ? '1' : +currentPage - 1;

  return (
    <Wrapper>
      <Button to={currentUrl.replace(/\d+$/gi, prevPageNumber)}>{'<'}</Button>
      <PageInformation>
        {localizeText('page')} <b>{currentPage}</b> {localizeText('of')} <b>{totalPages}</b>
      </PageInformation>
      <Button to={currentUrl.replace(/\d+$/gi, nextPageNumber)}>{'>'}</Button>
    </Wrapper>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired
}

export default withLocalization(Pagination);
