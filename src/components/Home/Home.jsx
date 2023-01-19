//import { useState, useEffect } from 'react';
import css from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = ({ movies }) => {
  //console.log(movies);
  return (
    <div>
      <p className={css.listTitle}>Trending today</p>
      <ul className={css.filmList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.listItem}>
            <Link to={`movies/${movie.id}`} className={css.link} id={movie.id}>
              {movie.title ?? movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
