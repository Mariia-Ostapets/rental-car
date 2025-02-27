import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { setPrices } from '../filters/slice';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (page, thunkAPI) => {
    const { filters } = thunkAPI.getState();
    try {
      const { data } = await api.get(
        `/cars?page=${page}&brand=${filters.filters.brand}&rentalPrice=${filters.filters.rentalPrice}&minMileage=${filters.filters.minMileage}&maxMileage=${filters.filters.maxMileage}`
      );

      console.log('API response:', data);

      const uniquePrices = [...new Set(data.cars.map(car => car.rentalPrice))];

      console.log('Unique prices:', uniquePrices);

      thunkAPI.dispatch(setPrices(uniquePrices));

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
