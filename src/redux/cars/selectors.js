import { createSelector } from '@reduxjs/toolkit';
import { selectFavourites } from '../filters/selectors';

export const selectPage = state => state.cars.carsState.page;
export const selectSelectedCar = state => state.cars.selectedCar;
export const selectTotalPages = state => state.cars.carsState.totalPages;
export const selectCars = state => state.cars.carsState.cars;
export const selectBrands = state => state.cars.brands;
export const selectRentalPrices = state => state.cars.rentalPrices;
export const selectError = state => state.cars.error;
export const selectLoading = state => state.cars.loading;

export const selectAllCars = createSelector(
  [selectCars, selectFavourites],
  (cars, favourites) => {
    if (!cars) return [];

    return cars.map(car => ({
      ...car,
      favourite: favourites.includes(car.id),
    }));
  }
);
