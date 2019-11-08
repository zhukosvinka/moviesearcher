import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MovieItem } from '../components';

const Wrapper = styled.div``;

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
`;

const MoviesList = ({ movies, max }) => {
  if (max) movies = movies.slice(0, max);

  return (
    <Wrapper>
      <List>
        {movies.map(movieData => (
          <MovieItem key={movieData.id} movieData={movieData} />
        ))}
      </List>
    </Wrapper>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  max: PropTypes.number,
};

export default MoviesList;
