import { combineReducers } from '@reduxjs/toolkit';
import regionReducer from './reducers/regionReducer';
import seedRedcuer from './reducers/seedReducer'
import likesReducer from './reducers/likesReducer'
import reviewsReducer from './reducers/reviewsReducer'

const rootReducer = combineReducers({
  region: regionReducer,
  seed: seedRedcuer,
  likes:likesReducer,
  reviews: reviewsReducer
});

export default rootReducer;