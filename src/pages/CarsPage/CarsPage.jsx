import FiltersBar from '../../components/FiltersBar/FiltersBar';
import CarsList from '../../components/CarsList/CarsList';
import MainLayout from '../../components/ui/MainLayout/MainLayout';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCars } from '../../redux/cars/operations';

export default function CarsPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('Fetching cars for page:', page);
    dispatch(getCars(page));
  }, [dispatch, page]);

  return (
    <MainLayout>
      <section>
        <FiltersBar />
        <CarsList />
        <LoadMoreBtn page={page} setPage={setPage} />
      </section>
    </MainLayout>
  );
}
