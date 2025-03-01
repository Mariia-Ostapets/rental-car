import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { getFiltersData } from './operations';
// import { getCars } from '../cars/operations';

// const handlePending = state => {
//   state.loading = true;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

export const initialState = {
  filters: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  },
  brands: [],
  prices: [],
  favourites: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    deleteFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        item => item !== action.payload
      );
    },
  },
});

export const { changeFilter, setPrices, addFavourite, deleteFavourite } =
  filtersSlice.actions;
export default filtersSlice.reducer;

const persistConfig = {
  key: 'filters',
  storage,
  // whitelist: ['filters', 'brands', 'prices', 'favourites'],
  whitelist: ['favourites'],
};

export const persistedFiltersReducer = persistReducer(
  persistConfig,
  filtersSlice.reducer
);
