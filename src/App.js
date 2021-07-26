import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import Loader from './components/Loader/Loader';
// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage';
// import NotFoundViews from './views/NotFoundViews';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "home-view" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js'));
const NotFoundViews = lazy(() => import('./views/NotFoundViews.js'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundViews />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </Container>
  );
}
