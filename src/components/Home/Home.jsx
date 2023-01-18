//import { useState, useEffect } from 'react';
import css from './Home.module.css';

const Home = ({ movies }) => {
  console.log(movies);
  return (
    <div>
      <p className={css.listTitle}>Trending today</p>
      <ul className={css.filmList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.listItem}>
            <a href="" className={css.link}>
              {movie.title ?? movie.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
