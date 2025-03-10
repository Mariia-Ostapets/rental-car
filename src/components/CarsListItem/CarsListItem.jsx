import css from './CarsListItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavourites } from '../../redux/filters/selectors';
import { Link } from 'react-router-dom';
import { addFavourite, deleteFavourite } from '../../redux/filters/slice';
import {
  getCityAndCountry,
  getSpaceInMileage,
  getFirstLetterUpperCase,
} from '../../utils';

export default function CarsListItem({
  id,
  img,
  brand,
  model,
  year,
  rentalPrice,
  address,
  rentalCompany,
  type,
  mileage,
  favourite,
}) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);

  const handleClick = () => {
    const isFavourite = favourites.find(item => item === id);

    if (!isFavourite) {
      dispatch(addFavourite(id));
      return;
    }

    dispatch(deleteFavourite(id));
  };

  return (
    <li className={css.carsItem}>
      <div className={css.carImgWrapper}>
        <img
          className={css.carImg}
          src={img}
          alt={`${brand} ${model} image`}
          loading="lazy"
        />
      </div>
      <div className={css.carTitleWrapper}>
        <h2 className={css.carTitle}>
          {brand} <span className={css.carTitleAccent}>{model}</span>, {year}
        </h2>
        <p className={css.carPrice}>${rentalPrice}</p>
      </div>
      <p className={css.carDescription}>
        {address
          ? getCityAndCountry(address).join(' | ') + ' | '
          : 'Location not available'}
        {rentalCompany && ` ${rentalCompany} |`}
        <br />
        {getFirstLetterUpperCase(type)}
        {mileage && ` | ${getSpaceInMileage(mileage)} km`}
      </p>
      <Link className={css.carsItemBtn} to={`/catalog/${id}`}>
        Read more
      </Link>{' '}
      {
        <svg
          className={css.carFavourite}
          onClick={handleClick}
          width="16"
          height="16"
        >
          <use
            href={`/sprite.svg#${
              favourite ? 'icon-heart-active' : 'icon-heart'
            }`}
          />
        </svg>
      }
    </li>
  );
}
