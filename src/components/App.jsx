import { useState, useEffect, lazy } from 'react';
import Home from '../pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Movies from '../pages/Movies/Movies';
import { key } from '../services/data';

const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  const [movies, setMovies] = useState([]);

  const searchTrendingMovies = () => {
    try {
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(Response.status);
          }
          return response.json();
        })
        .then(resp => {
          setMovies(resp.results);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      searchTrendingMovies();
    }
  }, [movies]);

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
        <Route path="*" element={<Home movies={movies} />} />
      </Routes>
    </div>
  );
};
