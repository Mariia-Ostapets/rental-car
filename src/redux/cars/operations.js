import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';
import { setRentalPrices } from './slice';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (page, thunkAPI) => {
    const { filters } = thunkAPI.getState();
    const { brand, rentalPrice, minMileage, maxMileage } = filters.filters;

    try {
      const { data } = await api.get('/cars', {
        params: {
          page,
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
        },
      });

      const rentalPrices = [...new Set(data.cars.map(car => car.rentalPrice))];
      thunkAPI.dispatch(setRentalPrices(rentalPrices));

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
