import css from './LoadMoreBtn.module.css';
import { Loader } from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectLoading, selectTotalPages } from '../../redux/cars/selectors';

export default function LoadMoreBtn({ page, setPage }) {
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);

  const onClick = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {totalPages !== null && totalPages > page && (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <button className={css.loadMoreBtn} onClick={onClick} type="button">
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
