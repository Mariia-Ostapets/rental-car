// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCars } from '../../redux/cars/operations';
// import { selectCars } from '../../redux/cars/selectors';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import css from './CarsPage.module.css';
// import { Link } from 'react-router-dom';
// import { Loader } from '../../components/Loader/Loader';
import CarsList from '../../components/CarsList/CarsList';

export default function CarsPage() {
  // const dispatch = useDispatch();
  // // const cars = useSelector(selectCars);

  // const { cars } = useSelector(selectCars);

  // useEffect(() => {
  //   dispatch(getCars({ filters: {} }));
  // }, [dispatch]);

  return (
    <div className={css.carsPageWrapper}>
      <FiltersBar />
      <CarsList />
    </div>
  );
}
