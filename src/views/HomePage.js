import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';
import noPoster from '../images/noposter.jpg';
import { fetchTrandingMovies } from '../services/movies-api';
import s from '../components/MovieDetailsPage/MovieDetailsPage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  const movieUrl = 'https://image.tmdb.org/t/p/w300';
  useEffect(() => {
    async function onFetchTrandingMovies() {
      try {
        setReqStatus('pending');
        const movies = await fetchTrandingMovies();
        setReqStatus('resolve');
        if (movies.length === 0) {
          toast.error('Oop, no movies!');
        }
        setMovies(movies);
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Oops, no match');
      }
    }
    onFetchTrandingMovies();
  }, []);

  return (
    <>
      {reqStatus === 'pending' && <Loader />}
      <h2 className={s.title}>Traiding today</h2>
      {movies.length > 0 && (
        <ul className={s.moviesList}>
          {movies.map(movie => (
            <li key={movie.id} className={s.moviesLink}>
              <Link className={s.movieLink} to={`/movies/${movie.id}`}>
                <img
                  className={s.imgMovie}
                  src={
                    movie.poster_path
                      ? `${movieUrl}${movie.poster_path}`
                      : noPoster
                  }
                  alt={movie.title}
                />
                <p>
                  {movie.title} ( {new Date(movie.release_date).getFullYear()})
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

HomePage.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
  }),
};
HomePage.defaultProps = { poster_path: noPoster };
