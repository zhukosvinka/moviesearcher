import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentContainer, Loader, MoviesList } from '../components';
import { toggleFavoritesMovie } from '../actions/favoritesMoviesActions';

const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const MovieImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const MovieDescription = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 70px;
  margin-top: 40px;
  @media screen and (max-width: 750px) {
    margin-left: 0;
  }
`;

const DescriptionItem = styled.li`
  margin-bottom: 10px;
`;

const DescriptionTitle = styled.h3`
  display: inline;
  color: #444444;
  font-size: 15px;
`;

const DescriptionText = styled.span``;

const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const GenreItem = styled(Link)`
  color: #444444;
  text-decoration: none;
  padding: 5px;
  display: block;
  background: #ebebeb;
  border-radius: 5px;
  margin-right: 5px;
  margin-top: 5px;
  &:hover {
    background: #dddddd;
  }
`;

const FavoritesButton = styled.div`
  padding: 10px;
  background-color: ${({isMovieInFavorites}) => isMovieInFavorites ? '#a93f3f' : '#3f7fbf'};
  color: #fff;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  &:hover {
    background-color: ${({isMovieInFavorites}) => isMovieInFavorites ? '#843636' : '#316ba6'};
  }
  &:active {
    background-color: #2f6091;
    background-color: ${({isMovieInFavorites}) => isMovieInFavorites ? '#662929' : '#2f6091'};
  }
`;

const RecommendationsTitle = styled(DescriptionTitle)`
  margin-top: 20px;
  display: block;
`

const MovieInfo = ({ movieData, isMovieInfoDataLoaded }) => {
  const { title, poster_path, release_date, tagline, overview, genres, id, recommendations } = movieData;

  const favoritesMovies = useSelector(
    ({ favoritesMoviesReducer }) => favoritesMoviesReducer.favoritesMovies,
  );

  const isMovieInFavorites = favoritesMovies && favoritesMovies.find(movie => movie.id === id);

  const dispatch = useDispatch();

  const renderGenresList = (
    <GenreList>
      {genres &&
        genres.map(genre => (
          <li key={genre.id}>
            <GenreItem to={`/genre/${genre.id}`}>{genre.name}</GenreItem>
          </li>
        ))}
    </GenreList>
  );

  const descriptionItems = [
    {
      title: 'Release date',
      type: release_date,
    },
    {
      title: 'Tagline',
      type: tagline,
    },
    {
      title: 'Description',
      type: overview,
    },
    {
      title: 'Genres',
      type: renderGenresList,
    },
  ];

  const renderRecommendations = () => (
    <>
      <RecommendationsTitle>Recommendations: </RecommendationsTitle>
      <MoviesList max={5} movies={recommendations.results}/>
    </>
  )

  return (
    <>
      <ContentContainer title={title}>
        {isMovieInfoDataLoaded ? (
          <ContentWrapper>
            <MovieImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />

            <MovieDescription>
              {descriptionItems.map(item => (
                <DescriptionItem key={item.title}>
                  <DescriptionTitle>{`${item.title}: `}</DescriptionTitle>
                  <DescriptionText>{item.type}</DescriptionText>
                </DescriptionItem>
              ))}
              <FavoritesButton isMovieInFavorites={isMovieInFavorites} onClick={() => dispatch(toggleFavoritesMovie(movieData))}>
                {isMovieInFavorites ? 'Remove from favorites' : 'Add to favorites'}
              </FavoritesButton>
            </MovieDescription>
          </ContentWrapper>
        ) : (
          <Loader />
        )}
        {isMovieInfoDataLoaded && renderRecommendations()}
      </ContentContainer>
    </>
  );
};

MovieInfo.propTypes = {
  movieData: PropTypes.object.isRequired,
  isMovieInfoDataLoaded: PropTypes.bool.isRequired
}

export default MovieInfo;
