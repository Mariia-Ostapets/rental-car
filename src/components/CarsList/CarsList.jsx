import { useSelector } from 'react-redux';
import css from './CarsList.module.css';
import { selectAllCars } from '../../redux/cars/selectors';
import CarsListItem from '../CarsListItem/CarsListItem';

export default function CarsList() {
  const carsListAll = useSelector(selectAllCars);
  console.log('carsListAll', carsListAll);

  return (
    <ul className={css.carsList}>
      {Array.isArray(carsListAll) && carsListAll.length === 0 && (
        <li>No available cars for your search!</li>
      )}
      {Array.isArray(carsListAll) &&
        carsListAll.length !== 0 &&
        carsListAll.map(item => {
          return <CarsListItem key={item.id} {...item} />;
        })}
    </ul>
  );
}
