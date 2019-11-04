import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  height: 60px;
  background-color: #3F7FBF;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  &:hover {
    opacity: .8;
  }
`

const Header = () => (
  <HeaderWrapper>
    <HeaderLink to='/'>React Movie Searcher</HeaderLink>
  </HeaderWrapper>
)

export default Header
