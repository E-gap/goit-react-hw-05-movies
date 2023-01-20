import { useState, useEffect } from 'react';
import css from './Reviews.module.css';
import { useParams } from 'react-router-dom';
import { key } from '../../services/data';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  const searchMovieReviews = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}&language=en-US&page=1`
    )
      .then(resp => resp.json())
      .then(resp => {
        setReviews(resp.results);
      });
  };

  /* useEffect(() => {
    searchMovieReviews();
  }, []); */

  return (
    <div>
      <ul className={css.reviewList}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p className={css.author}>{`Author: ${review.author}`}</p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={css.text}>We don't have any reviews for this movie</p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
