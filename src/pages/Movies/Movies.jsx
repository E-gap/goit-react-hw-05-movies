import css from './Movies.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { key } from '../../services/data';

const Movies = () => {
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const changeQuery = value => {
    setSearchParams(value !== '' ? { query: value } : {});
  };

  const searchMovieQuery = () => {
    setError('');
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=en-US&page=1&include_adult=false`
    )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.results.length === 0) {
          setError('Sorry, there are no movies for your request');
        }
        setMovies(resp.results);
      });
    reset();
  };

  useEffect(() => {
    if (query !== null) {
      searchMovieQuery();
    }
  }, [query]);

  const submitSearch = event => {
    event.preventDefault();
    searchMovieQuery();
  };

  const reset = () => {
    document.querySelector('form').reset();
  };

  return (
    <div>
      <form onSubmit={submitSearch} className={css.formaa}>
        <input
          className={css.input}
          onChange={event => changeQuery(event.target.value)}
        ></input>
        <button className={css.buttonSearch} type="submit">
          Search
        </button>
      </form>
      <ul className={css.filmList}>
        {movies.length > 0 && !error ? (
          movies.map(movie => (
            <li key={movie.id} className={css.listItem}>
              <Link
                to={`${movie.id}`}
                className={css.link}
                id={movie.id}
                state={{ from: location }}
              >
                {movie.title ?? movie.name}
              </Link>
            </li>
          ))
        ) : (
          <p>{error}</p>
        )}
      </ul>
    </div>
  );
};

export default Movies;
