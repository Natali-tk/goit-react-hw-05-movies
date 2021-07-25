import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMovieReviews } from '../../services/movies-api';
import s from './Reviews.module.css';
export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  useEffect(() => {
    async function onfetchMovieReviews() {
      try {
        setReqStatus('pending');
        const reviews = await fetchMovieReviews(movieId);
        setReqStatus('resolve');
        if (reviews.length === 0) {
          toast.error('Oop, no reviews!');
        }
        setReviews(reviews);
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Oops, no match');
      }
    }
    onfetchMovieReviews();
  }, [movieId]);
  return (
    <>
      {reviews.length > 0 ? (
        <ul className={s.listReviews}>
          {reviews.map(review => (
            <li key={review.id}>
              <p>
                Author: <span className={s.author}>{review.author}</span>
              </p>
              <p>"{review.content}"</p>
              <p>Find more at: {review.url} </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no Reviews</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};
