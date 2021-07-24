import s from './MovieDetailsPage.module.css';

export default function MovieDetailInfo({ movie }) {
  const {
    title,
    poster_path,
    vote_average,
    overview,
    // genres,
    release_date,
  } = movie;
  return (
    <>
      <div className={s.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
        <h2>{title}</h2>
        <p>({release_date})</p>
        <p>User Score: {vote_average * 10}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        {/* <h2>Genderes</h2>
    {genres && genres.map(genre => <span key={genre.id}>{genre.name} </span>)} */}
      </div>
    </>
  );
}
