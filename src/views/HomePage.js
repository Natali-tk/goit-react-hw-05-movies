import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';
import { fetchTrandingMovies } from '../services/movies-api';
import s from '../components/MovieDetailsPage/MovieDetailsPage.module.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');

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
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
