import { useState, useEffect } from 'react';
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
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import ButtonGoBack from '../components/ButtonGoBack/ButtonGoBack';
import s from '../components/MovieDetailsPage/MovieDetailsPage.module.css';
import NotFoundView from './NotFoundViews';
export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);

  const [reqStatus, setReqStatus] = useState('idle');
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  console.log(location);

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
            to={`${url}/cast`}
            className={s.addLink}
            activeClassName={s.activeAddLink}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/reviews`}
            className={s.addLink}
            activeClassName={s.activeAddLink}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/cast`} exact>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`${path}/reviews`} exact>
          <Reviews movieId={movieId} />
        </Route>
      </Switch>
      {reqStatus === 'rejected' && <NotFoundView />}
    </>
  );
}
