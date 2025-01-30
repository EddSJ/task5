import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLikes } from '../context/reducers/likesReducer';
import { translations } from './translations';

const LikeSlider = () => {
  const likes = useSelector((state) => state.likes.likes); 
  const currentLanguage = useSelector((state) => state.region.region);
  const dispatch = useDispatch();

  const handleLikesChange = (event) => {
    const newLikes = parseFloat(event.target.value); 
    dispatch(setLikes(newLikes)); 
  };

  const t = translations[currentLanguage];
  
  return (
    <div className="mb-3">
      <label htmlFor="likes-slider" className="form-label">{t.likesLabel}: {likes}</label>
      <input
        id="likes-slider"
        type="range"
        className="form-range"
        min="0"
        max="10"
        step="0.1"
        value={likes}
        onChange={handleLikesChange}
      />
    </div>
  );
};

export default LikeSlider;