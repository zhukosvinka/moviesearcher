import { createGlobalStyle } from 'styled-components'
import backgroundImage from '../../img/background.png'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${backgroundImage});
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`

export default GlobalStyle