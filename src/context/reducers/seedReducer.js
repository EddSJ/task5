import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seed: 293034
};

const seedSlice = createSlice({
  name: 'seed',
  initialState,
  reducers: {
    setSeed: (state, action) => {
      state.seed = action.payload;
    },
    generateNewSeed: (state) => {
      state.seed = Math.floor(Math.random() * 1000000); 
    }
  },
});

export const { setSeed, generateNewSeed  } = seedSlice.actions;
export default seedSlice.reducer;
