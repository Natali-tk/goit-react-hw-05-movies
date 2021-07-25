import s from './MovieDetailsPage.module.css';
import PropTypes from 'prop-types';
import noPoster from '../../images/noposter.jpg';

export default function MovieDetailInfo({ movie }) {
  const { title, poster_path, vote_average, overview, genres, release_date } =
    movie;
  const imgUrl = 'https://image.tmdb.org/t/p/w300';

  return (
    <>
      <div className={s.movieDetails}>
        <img
          src={poster_path ? `${imgUrl}${poster_path}` : noPoster}
          alt={title}
        />
        <div className={s.movieInfo}>
          <p className={s.movieName}>
            {title} ({new Date(release_date).getFullYear()})
          </p>
          <p>User Score: {vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genderes</h2>
          {genres && genres.map(genre => genre.name).join(', ')}
        </div>
      </div>
    </>
  );
}

MovieDetailInfo.propTypes = {
  title: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
  release_date: PropTypes.string,
};
