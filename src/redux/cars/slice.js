import { createSlice } from '@reduxjs/toolkit';
import { getCarById, getCars } from './operations';
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
    favorites: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    prices: [],
    mileages: [],
    brands: [],
    totalCars: 0,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
    incrementPage: state => {
      state.page += 1;
    },
    setBrands: (state, action) => {
      const newBrands = action.payload;
      state.brands = [...new Set([...state.brands, ...newBrands])];
    },
    setPrices: (state, action) => {
      const newPrices = action.payload;
      state.prices = [...new Set([...state.prices, ...newPrices])];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, handlePending)
      .addCase(getCars.fulfilled, (state, action) => {
        console.log('Fetched Cars:', action.payload);
        state.loading = false;
        state.error = null;
        state.mileages = action.payload.mileages;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;

        const newCars = action.payload.cars.filter(
          car => !state.items.some(existingCar => existingCar.id === car.id)
        );
        state.items = [...state.items, ...newCars];
        const newBrands = action.payload.cars.map(car => car.brand);
        state.brands = [...new Set([...state.brands, ...newBrands])];
        const newPrices = action.payload.cars.map(car => car.prices);
        state.prices = [...new Set([...state.prices, ...newPrices])];
      })
      .addCase(getCars.rejected, handleRejected)
      .addCase(getCarById.pending, handlePending)
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, handleRejected);
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
