import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noCastImg from '../../images/noimage.png';
import { fetchMovieCredits } from '../../services/movies-api';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [reqStatus, setReqStatus] = useState('idle');
  const actorImg = 'https://image.tmdb.org/t/p/w300';
  useEffect(() => {
    async function onFetchMovieCredits() {
      try {
        setReqStatus('pending');
        const cast = await fetchMovieCredits(movieId);
        setReqStatus('resolve');
        if (cast.length === 0) {
          toast.error('Oop, no actors!');
        }
        setCast(cast);
      } catch (error) {
        setReqStatus('rejected');
        toast.error('Oops, no match');
      }
    }
    onFetchMovieCredits();
  }, [movieId]);
  return (
    <>
      {cast.length > 0 && (
        <ul className={s.actorList}>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `${actorImg}${actor.profile_path}`
                    : noCastImg
                }
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  cast: PropTypes.shape({
    id: PropTypes.number,
    profile_path: PropTypes.string,
    name: PropTypes.string.isRequired,
    character: PropTypes.string,
  }),
};

Cast.defaultProps = { profile_path: noCastImg, character: '' };
