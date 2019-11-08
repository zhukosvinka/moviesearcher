import React from 'react'
import styled from 'styled-components'
import noPosterImg from '../img/no-poster-img.jpg'
import PropTypes from 'prop-types'
import withLocalization from '../hocs/withLocalization'
import MoviesList from './MoviesList'

const Wrapper = styled.div`

`

const PersonImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: auto;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
`

const PersonDescription = styled.div`

`

const PersonInfoList = styled.ul`
  list-style: none;
  margin: 30px 0;
  padding: 0;
`

const PersonInfoItem = styled.li``

const PersonInfoTitle = styled.h3``

const PersonInfoDescr = styled.div``

const PersonInfo = ({personData, localizeText}) => {
  console.log(personData)
  const {profile_path, name, birthday, place_of_birth, deathday, biography, movies} = personData

  const renderMoviesList = () => <MoviesList movies={movies}/>

  const descriptionItems = [
    {
      title: localizeText('name'),
      type: name,
    },
    {
      title: localizeText('birthday'),
      type: birthday,
    },
    {
      title: localizeText('deathday'),
      type: deathday,
    },
    {
      title: localizeText('placeOfBirth'),
      type: place_of_birth,
    },
    {
      title: localizeText('biography'),
      type: biography,
    },
    {
      title: localizeText('creditsByPerson'),
      type: renderMoviesList(),
    },
  ];

  return (
    <Wrapper>
      <PersonImage src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : noPosterImg}/>
      <PersonDescription>
        <PersonInfoList>
          {descriptionItems.map((item) => {
            if(!item.type) return null;
            if(item.type === renderMoviesList) item.title = `${item.title} ${name}`
            return (
              <PersonInfoItem key={item.title}>
                <PersonInfoTitle>{item.title}</PersonInfoTitle>
                <PersonInfoDescr>{item.type}</PersonInfoDescr>
              </PersonInfoItem>
            )
          })}
        </PersonInfoList>
      </PersonDescription>
    </Wrapper>
  )
}

PersonInfo.propTypes = {
  personData: PropTypes.object.isRequired
}

export default withLocalization(PersonInfo)
