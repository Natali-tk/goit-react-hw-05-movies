import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchMovieCredits } from '../../services/movies-api';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  console.log(movieId);
  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast);
  }, [movieId]);
  console.log(cast);
  return <h2>Актеры</h2>;
}
