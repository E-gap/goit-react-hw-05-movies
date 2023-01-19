import { useState, useEffect } from 'react';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  const [movies, setMovies] = useState([]);

  const key = '1b60c1098299c5cc97f7c1027b35f488';

  useEffect(() => {
    if (movies.length === 0) {
      searchMovies();
    }
  }, [movies]);

  const searchMovies = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
      .then(resp => resp.json())
      .then(resp => {
        return resp;
      })
      .then(resp => {
        setMovies(resp.results);
      });
  };

  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
