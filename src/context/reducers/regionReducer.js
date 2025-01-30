import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  region: "en",
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      if (['en', 'fr', 'de'].includes(action.payload)) {
        state.region = action.payload;
      }
    },
  },
});

export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
