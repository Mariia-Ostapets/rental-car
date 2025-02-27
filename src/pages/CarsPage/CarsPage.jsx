import FiltersBar from '../../components/FiltersBar/FiltersBar';
import CarsList from '../../components/CarsList/CarsList';
import MainLayout from '../../components/ui/MainLayout/MainLayout';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars } from '../../redux/cars/operations';
import { selectLoading } from '../../redux/cars/selectors';
import { Loader } from '../../components/Loader/Loader';

export default function CarsPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    console.log('Fetching cars for page:', page);
    dispatch(getCars(page));
  }, [dispatch, page]);

  return (
    <>
      {loading && <Loader />}
      <MainLayout>
        <section>
          <FiltersBar />
          <CarsList />
          <LoadMoreBtn page={page} setPage={setPage} />
        </section>
      </MainLayout>
    </>
  );
}
