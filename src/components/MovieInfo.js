import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ContentContainer, Loader } from '../components';

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
  background-color: #3f7fbf;
  color: #fff;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  &:hover {
    background-color: #316ba6;
  }
  &:active {
    background-color: #2f6091;
  }
`

const MovieInfo = ({ movieData, isMovieInfoDataLoaded }) => {
  const { title, poster_path, release_date, tagline, overview, genres } = movieData;

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
              <FavoritesButton>Add to favorites</FavoritesButton>
            </MovieDescription>

          </ContentWrapper>
        ) : (
          <Loader />
        )}
      </ContentContainer>
    </>
  );
};

export default MovieInfo;