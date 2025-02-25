import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getFiltersData = createAsyncThunk(
  'filters/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
