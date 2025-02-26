import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars } from '../../api/api';

export const getCars = createAsyncThunk(
  'cars/fetch',
  async ({ page, limit = 12, ...params }, thunkAPI) => {
    try {
      const data = await fetchCars({ page, limit, ...params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
