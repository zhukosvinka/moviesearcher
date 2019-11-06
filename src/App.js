import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/styled-components/globalStyle';
import { Header, Footer } from './components';
import MoviesContainer from './containers/MoviesContainer';
import MovieInfoContainer from './containers/MovieInfoContainer';
import FavoritesMoviesContainer from './containers/FavoritesMoviesContainer';
import SearchMovieContainer from './containers/SearchMovieContainer'

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
  const renderMovies = () =>
    MOVIES.map(({ title, type }) => <MoviesContainer key={type} title={title} type={type} />);

  return (
    <AllWrapper>
      <GlobalStyle />
      <Header />
      <Main>
        <SearchMovieContainer title='Search'/>
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
  );
}

export default App;
