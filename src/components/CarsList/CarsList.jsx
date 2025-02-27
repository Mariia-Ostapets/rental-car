import { useSelector } from 'react-redux';
import css from './CarsList.module.css';
import { selectCars } from '../../redux/cars/selectors';
import CarsListItem from '../CarsListItem/CarsListItem';

export default function CarsList() {
  const carsListAll = useSelector(selectCars);
  console.log('carsListAll:', carsListAll);

  return (
    <ul className={css.carsList}>
      {carsListAll !== null && carsListAll.length > 0 ? (
        carsListAll.map(item => {
          return <CarsListItem key={item.id} {...item} />;
        })
      ) : (
        <li>No available cars for your search!</li>
      )}
    </ul>
  );
}
