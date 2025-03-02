import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const initialState = {
  filters: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  },
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
        favourite => favourite !== action.payload
      );
    },
  },
});

export const { changeFilter, addFavourite, deleteFavourite } =
  filtersSlice.actions;
export default filtersSlice.reducer;

const persistConfig = {
  key: 'filters',
  storage,
  whitelist: ['favourites'],
};

export const persistedFiltersReducer = persistReducer(
  persistConfig,
  filtersSlice.reducer
);
