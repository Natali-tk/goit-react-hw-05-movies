import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';
import { fetchMovieDetails } from '../services/movies-api';
import MovieDetailInfo from '../components/MovieDetailsPage/MovieDetailInfo';
import ButtonGoBack from '../components/ButtonGoBack/ButtonGoBack';
import s from '../components/MovieDetailsPage/MovieDetailsPage.module.css';
import NotFoundView from './NotFoundViews';

const Cast = lazy(() =>
  import('../components/Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews/Reviews.js' /* webpackChunkName: "cast" */),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);

  const [reqStatus, setReqStatus] = useState('idle');
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function onFetchMoviesDetails() {
      try {
        setReqStatus('pending');
        const movie = await fetchMovieDetails(movieId);
        setReqStatus('resolve');
        if (movie.length === 0) {
          toast.error('Oop, no movie!');
        }
        setMovie(movie);
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Oops, no match');
      }
    }
    onFetchMoviesDetails();
  }, [movieId]);

  const handleBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {reqStatus === 'pending' && <Loader />}
      <ButtonGoBack onClick={handleBack} />
      <MovieDetailInfo movie={movie} />
      <ul className={s.addLinkList}>
        <li>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            className={s.addLink}
            activeClassName={s.addLinkActive}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location.state ? location.state.from : '/' },
            }}
            className={s.addLink}
            activeClassName={s.addLinkActive}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${path}/reviews`} exact>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
      {reqStatus === 'rejected' && <NotFoundView />}
    </>
  );
}
