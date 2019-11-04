import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 16px;
  max-width: 700px;
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0px 9px 10px 1px rgba(0,0,0,.1 );
`

const Title = styled.h2 `
  margin: 0;
  font-size: 18px;
  color: #444444;
  margin-bottom: 10px;
`

const ContentContainer = ({children, title}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  )
}

export default ContentContainer
