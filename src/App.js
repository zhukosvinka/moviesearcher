import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/styled-components/globalStyle';
import { Header, Footer } from './components';
import MoviesContainer from './containers/MoviesContainer';
import MovieInfoContainer from './containers/MovieInfoContainer';
import FavoritesMoviesContainer from './containers/FavoritesMoviesContainer';
import SearchMovieContainer from './containers/SearchMovieContainer';
import SettingsPanelContainer from './containers/SettingsPanelContainer';

const AllWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  margin: 10px;
  flex: 1;
`;

const MOVIES = [
  {
    title: 'Popular Movies',
    type: 'popular',
  },
  {
    title: 'Top Rated Movies',
    type: 'top_rated',
  },
];

function App() {
  const [theme, setTheme] = useState({
    isDarkModeEnable:
      localStorage.getItem('isDarkModeEnable') !== null
        ? JSON.parse(localStorage.getItem('isDarkModeEnable'))
        : false,
  });

  const renderMovies = () =>
    MOVIES.map(({ title, type }) => <MoviesContainer key={type} title={title} type={type} />);

  return (
    <ThemeProvider theme={theme}>
      <AllWrapper>
        <GlobalStyle />
        <Header />
        <Main>
          <SettingsPanelContainer toggleDarkMode={setTheme} />
          <SearchMovieContainer title="Search" />
          <FavoritesMoviesContainer />
          <Switch>
            <Route
              render={({ match }) => (
                <MoviesContainer
                  url={match.url}
                  page={match.params.page}
                  type={match.params.moviesType}
                />
              )}
              path="/movies/:moviesType/page/:page"
            />
            <Route
              render={({ match }) => (
                <MoviesContainer
                  url={match.url}
                  page={match.params.page}
                  genreType={{ genreId: match.params.genreId }}
                />
              )}
              path="/genre/:genreId/page/:page"
            />
            <Route component={MovieInfoContainer} path="/movie/:movieId" />
            <Route component={() => renderMovies()} exact path="/" />
          </Switch>
        </Main>
        <Footer />
      </AllWrapper>
    </ThemeProvider>
  );
}

export default App;
