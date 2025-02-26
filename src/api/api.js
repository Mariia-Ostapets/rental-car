import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const fetchCars = async ({ filters = {}, page = 1, perPage = 12 }) => {
//   const response = await api.get('/cars', {
//     params: {
//       brand: filters.brand || undefined,
//       rentalPrice: filters.price || undefined,
//       minMileage: filters.minMileage || undefined,
//       maxMileage: filters.maxMileage || undefined,
//       page,
//       limit: perPage,
//     },
//   });

//   return {
//     cars: response.data.cars,
//     hasMore: response.data.cars.length === perPage,
//     totalCars: response.data.totalCars,
//     totalPages: response.data.totalPages,
//     currentPage: response.data.page,
//   };
// };

export const fetchCars = async ({ page, limit, ...params }) => {
  const { data } = await api.get('/cars', {
    params: {
      ...params, // фільтри
      page, // номер поточної сторінки
      limit, // кількість карток на сторінці
    },
  });

  const prices = new Set();
  const mileages = new Set();
  data.cars.forEach(car => {
    prices.add(car.rentalPrice);
    mileages.add(car.mileage);
  });

  return {
    cars: data.cars,
    totalCars: data.totalCars,
    totalPages: data.totalPages,
    prices: [...prices],
    mileages: [...mileages],
  };
};

// export const fetchFiltersData = async () => {
//   const response = await api.get('/brands');
//   console.log('API Response:', response);
//   return response.data;
// };

export const fetchFiltersData = async () => {
  const { data } = await api.get('/brands');
  return data;
};
