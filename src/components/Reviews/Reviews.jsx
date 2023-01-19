import { useState, useEffect } from 'react';
import css from './Reviews.module.css';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    searchMovieReviews();
  }, []);

  const searchMovieReviews = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=1b60c1098299c5cc97f7c1027b35f488&language=en-US&page=1`
    )
      .then(resp => resp.json())
      .then(resp => {
        return resp;
      })
      .then(resp => {
        setReviews(resp.results);
      });
  };

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
