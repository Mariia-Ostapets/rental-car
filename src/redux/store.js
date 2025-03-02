import { configureStore } from '@reduxjs/toolkit';
import { persistedFiltersReducer } from './filters/slice';
import carsReducer from './cars/slice.js';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
