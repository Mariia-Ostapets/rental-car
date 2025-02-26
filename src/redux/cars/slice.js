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
      // Оновлюємо список брендів, додаючи нові унікальні бренди
      const newBrands = action.payload;
      state.brands = [...new Set([...state.brands, ...newBrands])];
    },
    setPrices: (state, action) => {
      // Оновлюємо список брендів, додаючи нові унікальні бренди
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
        // state.prices = action.payload.prices;
        state.mileages = action.payload.mileages;
        // state.brands = action.payload.brands;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;

        const newCars = action.payload.cars.filter(
          car => !state.items.some(existingCar => existingCar.id === car.id)
        );
        state.items = [...state.items, ...newCars];
        // Отримуємо нові бренди з нових машин
        const newBrands = action.payload.cars.map(car => car.brand);
        // Викликаємо setBrands для оновлення брендів
        state.brands = [...new Set([...state.brands, ...newBrands])];
        const newPrices = action.payload.cars.map(car => car.prices);
        state.prices = [...new Set([...state.prices, ...newPrices])];
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
