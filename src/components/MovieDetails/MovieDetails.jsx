import css from './MovieDetails.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const MoviesDetails = () => {
  const [details, setDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    searchMovieDetails();
  }, []);

  const searchMovieDetails = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1b60c1098299c5cc97f7c1027b35f488&language=en-US`
    )
      .then(resp => resp.json())
      .then(resp => {
        return resp;
      })
      .then(resp => {
        setDetails(resp);
      });
  };

  const basic = 'https://image.tmdb.org/t/p/w500';
  const path = details.poster_path;
  const date = details.release_date ?? details.first_air_date;
  const year = date ? date.slice(0, 4) : '';

  const genresMovie = details.genres
    ? details.genres.map(genre => genre.name).join(', ')
    : '';

  return (
    <div>
      <Link to="/" className={css.linkGoBack}>
        <FaLongArrowAltLeft style={{ marginRight: '10px' }} /> Go back
      </Link>
      <div className={css.flex}>
        <div className={css.image}>
          <img src={`${basic}${path}`} alt="poster" />
        </div>
        <div>
          <p className={css.title}>
            {details.title ?? details.name} ({year})
          </p>

          <p className={css.score}>
            Use score: {Math.round(details.vote_average * 10)} %
          </p>
          <p className={css.overview}>Overview</p>
          <p className={css.text}>{details.overview}</p>
          <p className={css.genres}>Genres</p>
          <p className={css.text}>{genresMovie}</p>
        </div>
      </div>
      <div>
        <p className={css.text}>Additional information</p>
        <ul className={css.listLink}>
          <li>
            <Link to="cast" className={css.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MoviesDetails;
