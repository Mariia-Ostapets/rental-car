import css from './CarDetails.module.css';
import {
  getShortId,
  getCityAndCountry,
  getSpaceInMileage,
  getFirstLetterUpperCase,
} from '../../utils';
import OrderForm from '../OrderForm/OrderForm';

export default function CarDetails({ car }) {
  return (
    <div className={css.carDetailsSection}>
      <div className={css.imgAndFormWrapper}>
        <div className={css.carImgWrapper}>
          <img src={car.img} alt={car.description} />
        </div>
        <OrderForm />
      </div>
      <div className={css.carDescriptionWrapper}>
        <div className={css.carTitleWrapper}>
          <h2 className={css.carTitle}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <div className={css.carId}>Id: {getShortId(car.id)}</div>
        </div>
        <div className={css.carLocationAndMileageWrapper}>
          <div className={css.carLocationWrapper}>
            <svg width={16} height={16}>
              <use href="/sprite.svg#icon-location"></use>
            </svg>
            <p className={css.carLocation}>
              {getCityAndCountry(car.address).join(', ')}
            </p>
          </div>
          <p className={css.carMileage}>
            Mileage: {getSpaceInMileage(car.mileage)} km
          </p>
        </div>
        <p className={css.carPrice}>${car.rentalPrice}</p>
        <p className={css.carDescription}>{car.description}</p>
        <div className={css.carDescrWrapper}>
          <h3 className={css.carDescrTitle}>Rental Conditions:</h3>
          <ul className={css.carDescrList}>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.rentalConditions[0]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.rentalConditions[1]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.rentalConditions[2]}</p>
            </li>
          </ul>
        </div>
        <div className={css.carDescrWrapper}>
          <h3 className={css.carDescrTitle}>Car Specifications:</h3>
          <ul className={css.carDescrList}>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-calendar"></use>
              </svg>
              <p>Year: {car.year}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-car"></use>
              </svg>
              <p>Type: {getFirstLetterUpperCase(car.type)}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-fuel-pump"></use>
              </svg>
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-gear"></use>
              </svg>
              <p>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
        </div>
        <div className={css.carDescrWrapper}>
          <h3 className={css.carDescrTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={css.carDescrList}>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.accessories[0]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.accessories[1]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.accessories[2]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.functionalities[0]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.functionalities[1]}</p>
            </li>
            <li className={css.carDescrItem}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-check-circle"></use>
              </svg>
              <p>{car.functionalities[2]}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
