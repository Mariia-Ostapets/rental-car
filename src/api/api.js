import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const fetchCars = async ({ page, limit, filters, ...params }) => {
//   const { data } = await api.get('/cars', {
//     params: {
//       ...params,
//       page,
//       limit,
//       brand: filters?.brand || undefined,
//       price: filters?.price || undefined,
//       mileage: filters?.mileage || undefined,
//     },
//   });

//   const prices = new Set();
//   const mileages = new Set();
//   const brands = new Set();
//   data.cars.forEach(car => {
//     prices.add(car.rentalPrice);
//     mileages.add(car.mileage);
//     brands.add(car.brand);
//   });

//   return {
//     cars: data.cars,
//     totalCars: data.totalCars,
//     totalPages: data.totalPages,
//     prices: [...prices],
//     mileages: [...mileages],
//     brands: [...brands],
//   };
// };

// export const fetchCars = async ({ page, filters }) => {
//   const { data } = await api.get(
//     `/cars?page=${page}&brand=${filters.filters.brand}&rentalPrice=${filters.filters.rentalPrice}&minMileage=${filters.filters.minMileage}&maxMileage=${filters.filters.maxMileage}`
//   );

//   return data;
// };

// export const fetchFiltersData = async () => {
//   const { data } = await api.get('/brands');
//   return data;
// };

// export const fetchCarById = async id => {
//   const { data } = await api.get(`/cars/${id}`);
//   return data;
// };
