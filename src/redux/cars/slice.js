import { createSlice } from '@reduxjs/toolkit';
import { getCarBrands, getCarById, getCars } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    carsState: {
      cars: [],
      page: null,
      totalPages: null,
      totalCars: null,
    },
    loading: null,
    error: null,
    brands: [],
    rentalPrices: [],
  },
  reducers: {
    setRentalPrices: (state, action) => {
      state.rentalPrices =
        state.carsState.page === 1
          ? action.payload
          : [...state.rentalPrices, ...action.payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.carsState.totalCars = action.payload.totalCars;
        state.carsState.page = Number(action.payload.page);
        state.carsState.totalPages = action.payload.totalPages;
        state.carsState.cars =
          state.carsState.page === 1
            ? action.payload.cars
            : [...state.carsState.cars, ...action.payload.cars];
      })

      .addCase(getCars.rejected, handleRejected)
      .addCase(getCarById.pending, handlePending)
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, handleRejected)
      .addCase(getCarBrands.pending, handlePending)
      .addCase(getCarBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getCarBrands.rejected, handleRejected);
  },
});

export const { setRentalPrices } = carsSlice.actions;

export default carsSlice.reducer;
