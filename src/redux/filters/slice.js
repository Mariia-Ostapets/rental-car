import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getFiltersData } from './operations';
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
    // items: [],
    filters: {
      brand: '',
      minMileage: '',
      maxMileage: '',
      price: '',
    },
    availableBrands: [],
    availablePrices: [],
    loading: false,
    error: null,
    // page: 1,
    // hasMore: true,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      //   state.page = 1;
      //   state.items = [];
    },
    resetFilter: state => {
      //   state.items = [];
      state.filters = {
        brand: '',
        minMileage: '',
        maxMileage: '',
        price: '',
      };
      //   state.loading = false;
      //   state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      //   .addCase(getFiltersData.pending, handlePending)
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.availableBrands = action.payload.brands;
        state.availablePrices = action.payload.prices;
        // state.availableBrands = action.payload;
        // state.availablePrices = action.payload.prices;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFiltersData.rejected, handleRejected);
  },
});

export const { setFilter, resetFilter } = filtersSlice.actions;
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
