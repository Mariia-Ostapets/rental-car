import { configureStore } from '@reduxjs/toolkit';
import { persistedCarsReducer } from './cars/slice';
import { persistedFiltersReducer } from './filters/slice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    filters: persistedFiltersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
