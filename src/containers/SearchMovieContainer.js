import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContentContainer, MoviesList, Loader } from '../components';
import { debounce } from '../helpers';
import { getMoviesBySearch } from '../actions/moviesListActions';
import withLocalization from '../hocs/withLocalization'

const Input = styled.input`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #a0a0a0;
  outline: none;
  font-family: 'Roboto', sans-serif;
  &:focus {
    border: 1px solid #3f7fbf;
  }
`;

const NothingFound = styled.div`
  margin-top: 10px;
`;

const findMovies = debounce((inputValue, dispatch, currentLang) => {
  console.log(currentLang)
  dispatch(getMoviesBySearch(inputValue, currentLang));
}, 500);

const SearchMovieContainer = ({ title, localizeText, currentLang }) => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const findedMovies = useSelector(
    ({ moviesListReducer }) => moviesListReducer.findedMovies.data.results,
  );
  const isLoading = useSelector(
    ({ moviesListReducer }) => moviesListReducer.findedMovies.isLoading,
  );

  const isFindedMoviesLoaded = !isLoading && findedMovies;

  const handleChange = e => {
    if (e.target.value < 2) findMovies('', dispatch, currentLang);
    setValue(e.target.value);
    findMovies(e.target.value, dispatch, currentLang);
  };

  const renderResult = () => {
    if (value.length < 2) return null;
    if (isFindedMoviesLoaded) {
      if (findedMovies.length > 0) return <MoviesList max={5} movies={findedMovies} />;
      else return <NothingFound>Nothing found</NothingFound>;
    }
    return <Loader />;
  };

  return (
    <ContentContainer title={title}>
      <Input onChange={handleChange} placeholder={localizeText('searchMovies')} value={value} />
      {renderResult()}
    </ContentContainer>
  );
};

export default withLocalization(SearchMovieContainer);
