import { Switch, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import NotFoundViews from './views/NotFoundViews';
export default function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundViews />
        </Route>
      </Switch>
    </Container>
  );
}
