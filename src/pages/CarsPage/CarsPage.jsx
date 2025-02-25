import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/cars/operations';
import { selectCars } from '../../redux/cars/selectors';
import FiltersBar from '../../components/FiltersBar/FiltersBar';

export default function CarsPage() {
  const dispatch = useDispatch();
  // const cars = useSelector(selectCars);

  const { cars } = useSelector(selectCars);

  useEffect(() => {
    dispatch(getCars({ filters: {} }));
  }, [dispatch]);

  return (
    <div>
      <FiltersBar />
      <ul>
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map(car => (
            <li key={car.id}>
              <h3>
                {car.brand} - ${car.rentalPrice}
              </h3>
              <p>Mileage: {car.mileage}</p>
            </li>
          ))
        ) : (
          <p>Loading cars...</p>
        )}
      </ul>
    </div>
  );
}
