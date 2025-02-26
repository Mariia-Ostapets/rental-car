import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiltersData } from '../../api/api';

export const getFiltersData = createAsyncThunk(
  'filters/fetch',
  async (_, thunkAPI) => {
    try {
      const data = await fetchFiltersData();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
