import React from 'react'
import styled from 'styled-components'
import {MovieItem} from '../components'

const Wrapper = styled.div`

`

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const MoviesList = ({movies}) => {
  return (
    <Wrapper>
      <List>
        {movies.map(movieData => (
          <MovieItem key={movieData.id} movieData={movieData}/>
        ))}
      </List>
    </Wrapper>
  )
}

export default MoviesList
