import { createSlice } from '@reduxjs/toolkit';
import { getCars } from './operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
    items: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    incrementPage: state => {
      state.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.items =
        //   state.page === 1
        //     ? action.payload.cars
        //     : [...state.items, ...action.payload.cars];
        state.items = action.payload || [];
        // state.hasMore = action.payload.length === 12;
        // if (state.page === 1) {
        //   state.items = action.payload.cars || [];
        // } else {
        //   state.items = [...state.items, ...(action.payload.cars || [])];
        // }

        state.hasMore = action.payload.cars?.length === 12;
        state.page += 1;
      })
      .addCase(getCars.rejected, handleRejected);
  },
});

export const { toggleFavorite, incrementPage } = carsSlice.actions;
export default carsSlice.reducer;

const persistConfig = {
  key: 'cars',
  storage,
  whitelist: ['favorites', 'filters'],
};

export const persistedCarsReducer = persistReducer(
  persistConfig,
  carsSlice.reducer
);
