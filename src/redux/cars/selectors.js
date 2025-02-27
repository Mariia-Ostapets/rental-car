export const selectPage = state => state.cars.carsState.page;

export const selectError = state => state.cars.error;
export const selectSelectedCar = state => state.cars.selectedCar;
export const selectTotalPages = state => state.cars.carsState.totalPages;
export const selectLoading = state => state.cars.loading;
export const selectCars = state => state.cars.carsState.cars;
export const selectFavorites = state => state.cars.favorites;
export const selectBrands = state => state.cars.brands;
