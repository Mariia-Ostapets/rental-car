import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getCars = createAsyncThunk(
  'cars/fetch',
  async ({ filters = {}, page = 1 }, thunkAPI) => {
    try {
      const response = await api.get('/cars', {
        params: {
          brand: filters.brand || undefined,
          rentalPrice: filters.price || undefined,
          minMileage: filters.minMileage || undefined,
          maxMileage: filters.maxMileage || undefined,
          page,
          limit: 10,
        },
      });

      const cars = response.data.cars;

      console.log('Response data:', response.data);

      const brands = [...new Set(cars.map(car => car.brand))];
      const prices = [...new Set(cars.map(car => car.rentalPrice))];

      return { cars, brands, prices };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
