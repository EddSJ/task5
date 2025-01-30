import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likes: 5.7, 
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.likes = action.payload; 
    },
  },
});

export const { setLikes } = likesSlice.actions;
export default likesSlice.reducer;