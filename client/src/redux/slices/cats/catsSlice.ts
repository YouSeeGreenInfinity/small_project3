import { createSlice } from '@reduxjs/toolkit';
import type { CatType } from '../../../types/catTypes';
import getCatsThunk from './catsThunks';

type CatState = CatType[];

const initialState: CatState = [];

const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatsThunk.fulfilled, (_, action) => action.payload)
      .addCase(getCatsThunk.rejected, () => []);
  },
});

export default catSlice.reducer;
