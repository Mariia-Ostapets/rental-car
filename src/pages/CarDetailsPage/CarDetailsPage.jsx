import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectSelectedCar,
  selectLoading,
  selectError,
} from '../../redux/cars/selectors';
import { useEffect } from 'react';
import CarDetails from '../../components/CarDetails/CarDetails';
import { Loader } from '../../components/Loader/Loader';
import { getCarById } from '../../redux/cars/operations';
import MainLayout from '../../components/ui/MainLayout/MainLayout';
import DocumentTitle from '../../components/ui/DocumentTitle';

export default function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectSelectedCar);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  return (
    <>
      <DocumentTitle>
        Rent {car?.brand || 'Loading...'} {car?.model || 'Loading...'}
      </DocumentTitle>
      <MainLayout>
        <section>
          {car && <CarDetails car={car} />}
          {loading && <Loader />}
          {error && <p>Error: {error}</p>}
        </section>
      </MainLayout>
    </>
  );
}
