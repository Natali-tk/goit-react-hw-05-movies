import { useState, useEffect } from 'react';
import { fetchTrandingMovies } from '../services/movies-api';
import s from '../components/MovieDetailsPage/Movies.module.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchTrandingMovies().then(setMovies);
  }, []);

  return (
    <>
      <h2 className={s.title}>Traiding today</h2>
      <ul className={s.moviesList}>
        {movies.map(movie => (
          <li key={movie.id} className={s.moviesLink}>
            <Link className={s.movieLink} to={`/movies/${movie.id}`}>
              {' '}
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
