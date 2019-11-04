import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  background-color: #232323;
  height: 100px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #A0A0A0;
`

const Footer = () => {
  return (
    <Wrapper>
      by padoctb
    </Wrapper>
  )
}

export default Footer
