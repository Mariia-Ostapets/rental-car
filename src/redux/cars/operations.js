import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (page, thunkAPI) => {
    const { filters } = thunkAPI.getState();

    try {
      const { data } = await api.get(
        `/cars?page=${page}&brand=${filters.filters.brand}&rentalPrice=${filters.filters.rentalPrice}&minMileage=${filters.filters.minMileage}&maxMileage=${filters.filters.maxMileage}`
      );

      console.log('API response:', data);

      return data;
    } catch (error) {
      console.error('API error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getCarById',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCarBrands = createAsyncThunk(
  'cars/getCarBrands',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/brands');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
