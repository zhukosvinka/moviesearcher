import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100px;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  box-shadow: 0px 3px 7px -4px rgba(0,0,0,.5);
  transition: transform .5s ease;
  display: block;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: translateY(-5px);
  }
`

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`

const Title = styled.h3`
  color: #444444;
`

const MovieItem = ({movieData}) => {
  return (
    <Wrapper to={`/movie/${movieData.id}`}>
      <MovieImage src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}/>
      <Title>{movieData.title}</Title>
    </Wrapper>
  )
}

export default MovieItem
