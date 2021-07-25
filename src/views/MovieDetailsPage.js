import { useState, useEffect } from 'react';
import {
  Link,
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
    if (!location.state) {
      history.push('/');
      return;
    }

    history.push({
      pathname: '/movies',
      search: location.state.from.search,
    });
  };

  return (
    <>
      {reqStatus === 'pending' && <Loader />}
      <ButtonGoBack onClick={handleBack} />
      <MovieDetailInfo movie={movie} />
      <ul className={s.addLinkList}>
        <li>
          <Link to={`${url}/cast`} className={s.addLink}>
            Cast
          </Link>
        </li>
        <li>
          <Link to={`${url}/reviews`} className={s.addLink}>
            Reviews
          </Link>
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
    </>
  );
}
