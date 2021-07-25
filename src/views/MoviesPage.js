import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMovie } from '../services/movies-api';
import Searchbar from '../components/Searchbar/Searchbar';
import Loader from '../components/Loader/Loader';
import noPoster from '../images/noposter.jpg';
import s from '../components/MovieDetailsPage/MovieDetailsPage.module.css';

export default function MoviesPage() {
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  const [query, setQuery] = useState('');
  const [reqStatus, setReqStatus] = useState('idle');
  const location = useLocation();
  const history = useHistory();
  const movieUrl = 'https://image.tmdb.org/t/p/w300';

  useEffect(() => {
    if (!query) return;
    async function onFetchMovie() {
      try {
        setReqStatus('pending');
        const moviesByQuery = await fetchMovie(query);
        setReqStatus('resolve');
        if (moviesByQuery.length === 0) {
          toast.error('Oops, no such movie');
        }
        setMoviesByQuery(moviesByQuery);
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Oops, no match');
      }
    }
    onFetchMovie();
  }, [query]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const handleSubmit = query => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
    setQuery(query);
    setMoviesByQuery([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {reqStatus === 'pending' && <Loader />}
      {moviesByQuery.length > 0 && (
        <ul className={s.moviesList}>
          {moviesByQuery.map(movie => (
            <li key={movie.id} className={s.moviesLink}>
              <Link
                className={s.movieLink}
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
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
