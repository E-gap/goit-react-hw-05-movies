import css from './Movies.module.css';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovieQuery = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1b60c1098299c5cc97f7c1027b35f488&query=${input}&language=en-US&page=1&include_adult=false`
    )
      .then(resp => resp.json())
      .then(resp => {
        return resp;
      })
      .then(resp => {
        console.log(resp.results);
        setMovies(resp.results);
      });
  };

  const submitSearch = event => {
    event.preventDefault();
    searchMovieQuery();
  };

  return (
    <div>
      <form onSubmit={submitSearch}>
        <input
          className={css.input}
          value={input}
          onChange={event => setInput(event.target.value)}
        ></input>
        <button className={css.buttonSearch}>Search</button>
      </form>
    </div>
  );
};

export default Movies;
