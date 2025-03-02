import css from './CarsList.module.css';
import { useSelector } from 'react-redux';
import { selectAllCars } from '../../redux/cars/selectors';
import CarsListItem from '../CarsListItem/CarsListItem';

export default function CarsList() {
  const carsListAll = useSelector(selectAllCars);

  return (
    <ul className={css.carsList}>
      {Array.isArray(carsListAll) && carsListAll.length === 0 && (
        <li className={css.notification}>
          No available cars for your search. Please try another search.
        </li>
      )}
      {Array.isArray(carsListAll) &&
        carsListAll.length !== 0 &&
        carsListAll.map(item => {
          return <CarsListItem key={item.id} {...item} />;
        })}
    </ul>
  );
}
