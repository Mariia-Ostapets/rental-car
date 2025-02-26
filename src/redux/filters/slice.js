import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { getFiltersData } from './operations';
import { getCars } from '../cars/operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    brands: [],
    prices: [],
    mileages: [],
    selectedBrand: '',
    selectedPrice: '',
    selectedMileage: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setSelectedPrice(state, action) {
      state.selectedPrice = action.payload;
    },
    setSelectedMileage(state, action) {
      state.selectedMileage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.brands = action.payload.brands;
        state.prices = action.payload.prices;
        state.mileages = action.payload.mileages;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCars.rejected, handleRejected);
  },
});

export const {
  setSelectedBrand,
  setSelectedPrice,
  setSelectedMileage,
  resetFilters,
  applyFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;

const persistConfig = {
  key: 'filters',
  storage,
  whitelist: ['filters'],
};

export const persistedFiltersReducer = persistReducer(
  persistConfig,
  filtersSlice.reducer
);
