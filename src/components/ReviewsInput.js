import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../context/reducers/reviewsReducer';
import { translations } from './translations';

const ReviewInput = () => {
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.region.region);

  const handleReviewsChange = (event) => {
    const newReviews = parseFloat(event.target.value);
    dispatch(setReviews(newReviews));
  };

  const t = translations[currentLanguage];

  return (
    <div className="mb-3">
      <label htmlFor="reviews-input" className="form-label">{t.reviewsLabel}</label>
      <input
        id="reviews-input"
        type="number"
        className="form-control"
        min="0"
        max="10"
        step="0.1"
        value={reviews}
        onChange={handleReviewsChange}
      />
    </div>
  );

};

export default ReviewInput;