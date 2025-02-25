import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import {
  selectFilters,
  selectAvailableBrands,
  selectAvailablePrices,
} from '../../redux/filters/selectors';
// import { getFiltersData } from '../../redux/filters/operations';
import { useEffect } from 'react';
import { getCars } from '../../redux/cars/operations';

export default function FiltersBar() {
  const dispatch = useDispatch();
  const brands = useSelector(selectAvailableBrands);
  const prices = useSelector(selectAvailablePrices);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(getCars({ filters: {} }));
  }, [dispatch]);

  const handleChange = e => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    dispatch(getCars({ filters }));
  };

  return (
    <div>
      <label>
        Brand:
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label>
        Price:
        <select name="price" value={filters.price} onChange={handleChange}>
          <option value="">All Prices</option>
          {prices.map(price => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </label>

      <label>
        Mileage:
        <input
          type="number"
          name="minMileage"
          placeholder="Min"
          value={filters.minMileage}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxMileage"
          placeholder="Max"
          value={filters.maxMileage}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSearch}>Apply Filters</button>
    </div>
  );
}
