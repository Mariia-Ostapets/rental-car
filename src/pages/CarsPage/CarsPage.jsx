import FiltersBar from '../../components/FiltersBar/FiltersBar';
import CarsList from '../../components/CarsList/CarsList';
import MainLayout from '../../components/ui/MainLayout/MainLayout';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars } from '../../redux/cars/operations';
import { selectLoading } from '../../redux/cars/selectors';
import { Loader } from '../../components/Loader/Loader';
import DocumentTitle from '../../components/ui/DocumentTitle';

export default function CarsPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getCars(page));
  }, [dispatch, page]);

  return (
    <>
      <DocumentTitle>Rental Car Catalog</DocumentTitle>
      {loading && <Loader />}
      <MainLayout>
        <section>
          <FiltersBar page={page} setPage={setPage} />
          <CarsList />
          <LoadMoreBtn page={page} setPage={setPage} />
        </section>
      </MainLayout>
    </>
  );
}
