import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// export const getCars = createAsyncThunk(
//   'cars/getCars',
//   async ({ page, limit = 12, ...params }, thunkAPI) => {
//     try {
//       const data = await fetchCars({ page, limit, ...params });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (page, thunkAPI) => {
    const { filters } = thunkAPI.getState();
    try {
      console.log('Redux State:', thunkAPI.getState());
      console.log('Filters:', filters);
      const { data } = await api.get(
        `/cars?page=${page}&brand=${filters.filters.brand}&rentalPrice=${filters.filters.rentalPrice}&minMileage=${filters.filters.minMileage}&maxMileage=${filters.filters.maxMileage}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getCarById = createAsyncThunk(
//   'cars/getCarById',
//   async (id, thunkAPI) => {
//     try {
//       const data = await fetchCarById(id);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
