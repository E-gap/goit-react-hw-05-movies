import { useState, useEffect } from 'react';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

export const App = () => {
  const [movies, setMovies] = useState([]);

  const key = '1b60c1098299c5cc97f7c1027b35f488';

  useEffect(() => {
    if (movies.length === 0) {
      search();
    }
  }, [movies]);

  const search = () => {
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
        </Route>
      </Routes>
    </div>
  );
};
