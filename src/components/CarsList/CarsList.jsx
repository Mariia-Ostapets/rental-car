import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '../../redux/cars/selectors';
import { toggleFavorite } from '../../redux/cars/slice';

import { useEffect } from 'react';
import { getCars } from '../redux/operations';
import { selectCars, selectFilters, selectHasMore } from '../redux/selectors';

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const favorites = useSelector(selectFavorites);
  const filters = useSelector(selectFilters);
  const hasMore = useSelector(selectHasMore);
  //   const page = cars.length / 10 + 1; // Вираховуємо поточну сторінку

  useEffect(() => {
    dispatch(getCars({ filters, page: 1 })); // Завантаження першої сторінки
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(getCars({ filters, page: cars.length / 10 + 1 })); // Завантаження наступної сторінки
  };

  return (
    <div>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <h3>
              {car.brand} - ${car.price.toLocaleString()}
            </h3>
            <p>Mileage: {car.mileage.toLocaleString('en-US')} km</p>
            <button onClick={() => dispatch(toggleFavorite(car.id))}>
              <svg width="24" height="24">
                <use
                  href={`/sprite.svg#${
                    favorites.includes(car.id)
                      ? 'icon-heart-active'
                      : 'icon-heart'
                  }`}
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {hasMore && <button onClick={handleLoadMore}>Load More</button>}
    </div>
  );
}
