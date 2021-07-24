import { useState, useEffect } from 'react';
import {
  Link,
  Router,
  Switch,
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

export default function MovieDetailsPage() {
  // const movie = movies.find( movie => movie.id === movieId);
  const [movie, setMovie] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  console.log(url);

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

  console.log(movie);

  return (
    <>
      {reqStatus === 'pending' && <Loader />}
      <MovieDetailInfo movie={movie} />
      <hr />
      <ul>
        <li>
          <Link to={`${url}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Switch>
        <Router path={`${path}/cast`} exact>
          {movie && <Cast movie={movie} />}
        </Router>
        <Router path={`${path}/reviews`} exact>
          {movie && <Reviews movie={movie} />}
        </Router>
      </Switch>
    </>
  );
}
