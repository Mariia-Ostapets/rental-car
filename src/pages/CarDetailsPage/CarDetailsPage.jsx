import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/carsSlice';
import { selectFavorites } from '../redux/selectors';

export default function CarDetailsPage({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const handleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  return (
    <div className="car-card">
      <h3>
        {car.brand} - ${car.price.toLocaleString()}
      </h3>
      <p>Пробіг: {car.mileage.toLocaleString('uk-UA')} км</p>
      <button onClick={handleFavorite}>
        {favorites.includes(car.id)
          ? 'Remove from favorites'
          : 'Add to favorites'}
      </button>
    </div>
  );
}
