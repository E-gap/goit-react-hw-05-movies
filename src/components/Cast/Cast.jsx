import { useState, useEffect } from 'react';
import css from './Cast.module.css';
import { BsFillCircleFill } from 'react-icons/bs';

import { useParams } from 'react-router-dom';

const Cast = () => {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    searchMovieCredits();
  }, []);

  const searchMovieCredits = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1b60c1098299c5cc97f7c1027b35f488&language=en-US`
    )
      .then(resp => resp.json())
      .then(resp => {
        return resp;
      })
      .then(resp => {
        setCredits(resp.cast);
      });
  };

  const basic = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <ul className={css.castList}>
        {credits.map(credit => (
          <li key={credit.id}>
            <img
              src={`${basic}${credit.profile_path}`}
              className={css.profile}
              alt="photo cast"
            />
            <p className={`${css.text} ${css.displayFlex}`}>
              <BsFillCircleFill
                style={{
                  height: '10px',
                  width: '10px',
                  marginRight: '10px',
                }}
              />
              {credit.name}
            </p>

            <p className={css.text}>Character: {credit.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
