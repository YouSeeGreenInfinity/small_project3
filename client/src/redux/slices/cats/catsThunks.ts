import { createAsyncThunk } from '@reduxjs/toolkit';
import catsService from '../../../services/catsService';
import type { CatType } from '../../../types/catTypes';

const getCatsThunk = createAsyncThunk<CatType[]>('cats/getCats', async () => {
  const data = await catsService.getCats();
  return data;
});

export default getCatsThunk;
