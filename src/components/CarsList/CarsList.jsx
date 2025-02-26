import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/cars/slice';
import { useEffect } from 'react';
import { getCars } from '../../redux/cars/operations';
import {
  selectCars,
  // selectError,
  selectFavorites,
  selectLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import css from './CarsList.module.css';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { incrementPage } from '../../redux/cars/slice';
// import toast, { Toaster } from 'react-hot-toast';

export default function CarsList() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const filters = useSelector(selectFilters);
  const cars = useSelector(selectCars);
  console.log('Cars:', cars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getCars({ filters, page: 1, limit: 12 }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(getCars({ filters, page: page + 1, limit: 12 }));
    dispatch(incrementPage());
  };

  return (
    <div>
      <ul className={css.carsList}>
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map(car => (
            <li className={css.carsItem} key={car.id}>
              <div className={css.carImgWrapper}>
                <img
                  className={css.carImg}
                  src={car.img}
                  alt={`${car.brand} ${car.model} image`}
                  loading="lazy"
                />
              </div>
              <div className={css.carTitleWrapper}>
                <h2 className={css.carTitle}>
                  {car.brand}{' '}
                  <span className={css.carTitleAccent}>{car.model}</span>,{' '}
                  {car.year}
                </h2>
                <p className={css.carPrice}>${car.rentalPrice}</p>
              </div>
              <p className={css.carDescription}>
                {car.address
                  ? car.address.split(', ').slice(-2).join(' | ') + ' | '
                  : 'Location not available'}
                {car.rentalCompany && ` ${car.rentalCompany} |`}
                <br />{' '}
                {car.type.charAt(0).toUpperCase() +
                  car.type.slice(1).toLowerCase()}
                {car.mileage && ` | ${car.mileage.toLocaleString()} km`}
              </p>
              <Link className={css.carsItemBtn} to={`/catalog/${car.id}`}>
                Read more
              </Link>{' '}
              <svg
                className={css.carFavourite}
                onClick={() => dispatch(toggleFavorite(car.id))}
                width="16"
                height="16"
              >
                <use
                  href={`/sprite.svg#${
                    favorites.includes(car.id)
                      ? 'icon-heart-active'
                      : 'icon-heart'
                  }`}
                />
              </svg>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
      {page < totalPages && (
        <button
          className={css.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? <Loader /> : 'Load more'}
        </button>
      )}
    </div>
  );
}
