import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from '../../api/api';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async ({ page, limit = 12, ...params }, thunkAPI) => {
    try {
      const data = await fetchCars({ page, limit, ...params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getCarById',
  async (id, thunkAPI) => {
    try {
      const data = await fetchCarById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
