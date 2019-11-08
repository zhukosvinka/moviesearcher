import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentContainer, Loader, MoviesList } from '../components';
import { toggleFavoritesMovie } from '../actions/favoritesMoviesActions';
import noPosterImg from '../img/no-poster-img.jpg';
import ImageGallery from 'react-image-gallery';
import withLocalization from '../hocs/withLocalization';
import { getFormattedDate } from '../helpers';

const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const MovieImageWrapper = styled.div`
  width: 300px;
  height: 500px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: auto;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
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
  background-color: ${({ isMovieInFavorites }) => (isMovieInFavorites ? '#a93f3f' : '#3f7fbf')};
  color: #fff;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ isMovieInFavorites }) => (isMovieInFavorites ? '#843636' : '#316ba6')};
  }
  &:active {
    background-color: #2f6091;
    background-color: ${({ isMovieInFavorites }) => (isMovieInFavorites ? '#662929' : '#2f6091')};
  }
`;

const GroupTitle = styled(DescriptionTitle)`
  margin-top: 20px;
  display: block;
`;

const CastList = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  max-height: 400px;
  overflow: auto;
`;

const PersonItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #e3e3e3;
  }
`;

const PersonImage = styled.img`
  width: 60px;
  height: auto;
`;

const PersonInfo = styled.div`
  margin-left: 10px;
  color: #444444;
`;

const PersonName = styled.div`
  font-weight: 600;
`;

const PersonCharacter = styled.div``;

const LeftSide = styled.div``;

const VoteNumber = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: rgb(2, 0, 36);
  padding: 10px;
  border-bottom-left-radius: 15px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  box-shadow: -2px 9px 10px 1px rgba(0, 0, 0, 0.2);
  background: rgb(2, 0, 36);
  ${({ color }) => color};
`;

const MovieInfo = ({ movieData, isMovieInfoDataLoaded, localizeText, currentLang }) => {
  const {
    title,
    poster_path,
    release_date,
    tagline,
    overview,
    genres,
    id,
    recommendations,
    cast,
    images,
    vote_average,
    crew,
  } = movieData;

  const dispatch = useDispatch();

  const imagesForSlider = [];

  if (images)
    images.forEach(image =>
      imagesForSlider.push({
        original: `https://image.tmdb.org/t/p/w500/${image.file_path}`,
        thumbnail: `https://image.tmdb.org/t/p/w500/${image.file_path}`,
      }),
    );

  const favoritesMovies = useSelector(
    ({ favoritesMoviesReducer }) => favoritesMoviesReducer.favoritesMovies,
  );

  const isMovieInFavorites = favoritesMovies && favoritesMovies.find(movie => movie.id === id);

  const director = isMovieInfoDataLoaded && crew.find(item => item.job === 'Director');

  const getVoteWrapperColor = () => {
    const voteNumber = Number(vote_average);
    if (voteNumber >= 7)
      return css`
        background: linear-gradient(
          201deg,
          rgba(2, 0, 36, 1) 0%,
          rgba(38, 121, 9, 1) 0%,
          rgba(19, 167, 132, 1) 45%,
          rgba(13, 181, 170, 1) 57%,
          rgba(0, 212, 255, 1) 100%
        );
      `;
    if (voteNumber >= 4)
      return css`
        background: linear-gradient(
          201deg,
          rgba(2, 0, 36, 1) 0%,
          rgba(208, 199, 46, 1) 0%,
          rgba(147, 163, 21, 1) 45%,
          rgba(170, 175, 32, 1) 59%,
          rgba(167, 176, 44, 1) 100%
        );
      `;
    return css`
      background: linear-gradient(
        201deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(152, 29, 29, 1) 0%,
        rgba(223, 78, 78, 1) 45%,
        rgba(158, 23, 23, 1) 63%,
        rgba(65, 15, 15, 1) 100%
      );
    `;
  };

  const renderGenresList = (
    <GenreList>
      {genres &&
        genres.map(genre => (
          <li key={genre.id}>
            <GenreItem to={`/moviesearcher/genre/${genre.id}/page/1`}>{genre.name}</GenreItem>
          </li>
        ))}
    </GenreList>
  );

  const renderCastList = (
    <CastList>
      {cast &&
        cast.map((person, i) => {
          return (
            <PersonItem to={`/moviesearcher/person/${person.id}`} key={person.id}>
              <PersonImage
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : noPosterImg
                }
              />
              <PersonInfo id="person-info">
                <PersonName>{person.name}</PersonName>
                <PersonCharacter>{person.character}</PersonCharacter>
              </PersonInfo>
            </PersonItem>
          );
        })}
    </CastList>
  );

  const renderImages = () => {
    if (imagesForSlider.length === 0) return null;
    return (
      <>
        <GroupTitle>{localizeText('movieImages')}: </GroupTitle>
        <ImageGallery showPlayButton={false} showFullscreenButton={false} items={imagesForSlider} />
      </>
    );
  };

  const renderRecommendations = () => {
    if (recommendations.results.length === 0) return null;
    return (
      <>
        <GroupTitle>{localizeText('recommendations')}: </GroupTitle>
        <MoviesList max={5} movies={recommendations.results} />
      </>
    );
  };

  const descriptionItems = [
    {
      title: localizeText('releaseDate'),
      type: getFormattedDate(release_date, currentLang),
    },
    {
      title: localizeText('director'),
      type: director.name,
    },
    {
      title: localizeText('tagline'),
      type: tagline,
    },
    {
      title: localizeText('description'),
      type: overview,
    },
    {
      title: localizeText('genres'),
      type: renderGenresList,
    },
    {
      title: localizeText('cast'),
      type: renderCastList,
    },
  ];

  return (
    <>
      <ContentContainer title={title}>
        {isMovieInfoDataLoaded ? (
          <ContentWrapper>
            <LeftSide>
              <MovieImageWrapper>
                <MovieImage
                  src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noPosterImg}
                />
                <VoteNumber color={getVoteWrapperColor()}>{vote_average}</VoteNumber>
              </MovieImageWrapper>
              <FavoritesButton
                isMovieInFavorites={isMovieInFavorites}
                onClick={() => dispatch(toggleFavoritesMovie(movieData))}
              >
                {isMovieInFavorites
                  ? localizeText('removeFromFavorites')
                  : localizeText('addToFavorites')}
              </FavoritesButton>
            </LeftSide>

            <MovieDescription>
              {descriptionItems.map(item => {
                if (!item.type) return null;
                return (
                  <DescriptionItem key={item.title}>
                    <DescriptionTitle>{`${item.title}: `}</DescriptionTitle>
                    <DescriptionText>{item.type}</DescriptionText>
                  </DescriptionItem>
                );
              })}
            </MovieDescription>
          </ContentWrapper>
        ) : (
          <Loader />
        )}
        {isMovieInfoDataLoaded && renderImages()}
        {isMovieInfoDataLoaded && renderRecommendations()}
      </ContentContainer>
    </>
  );
};

MovieInfo.propTypes = {
  movieData: PropTypes.object.isRequired,
  isMovieInfoDataLoaded: PropTypes.bool.isRequired,
};

export default withLocalization(MovieInfo);
