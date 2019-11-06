import { createGlobalStyle } from 'styled-components'
import backgroundImage from '../../img/background.png'
import backgroundImageDark from '../../img/background-dark.png'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${({theme}) => !theme.isDarkModeEnable ? backgroundImage : backgroundImageDark});
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