import { createSelector } from '@reduxjs/toolkit';
import { selectFavourites } from '../filters/selectors';

export const selectPage = state => state.cars.carsState.page;

export const selectError = state => state.cars.error;
export const selectSelectedCar = state => state.cars.selectedCar;
export const selectTotalPages = state => state.cars.carsState.totalPages;
export const selectLoading = state => state.cars.loading;
export const selectCars = state => state.cars.carsState.cars;
export const selectBrands = state => state.cars.brands;

export const selectAllCars = createSelector(
  [selectCars, selectFavourites],
  (cars, favourites) => {
    if (cars === null) return;
    return cars.reduce((acc, car) => {
      if (favourites.includes(car.id)) {
        acc.push({
          ...car,
          favourite: true,
        });
        return acc;
      }
      acc.push(car);
      return acc;
    }, []);
  }
);
