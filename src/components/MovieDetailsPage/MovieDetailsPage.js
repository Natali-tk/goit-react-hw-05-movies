import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/movies-api';
export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      <h2>Это фильм</h2>
    </>
  );
}
