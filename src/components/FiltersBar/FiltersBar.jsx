import { useSelector, useDispatch } from 'react-redux';
// import { setFilter } from '../../redux/filters/slice';
import {
  selectFilters,
  // selectAvailableBrands,
  selectPrices,
  // selectAvailableMileages,
} from '../../redux/filters/selectors';
// import { getFiltersData } from '../../redux/filters/operations';
// import { useEffect } from 'react';
// import { getCars } from '../../redux/cars/operations';
import // setSelectedBrand,
// setSelectedMileage,
// setSelectedPrice,
// resetFilters,
// applyFilters,
'../../redux/filters/slice';
import { selectBrands } from '../../redux/cars/selectors';
// import { selectTotalPages } from '../../redux/cars/selectors';
import { Formik, Field, Form } from 'formik';
// import { useId } from 'react';
import css from './FiltersBar.module.css';
import { useEffect } from 'react';
import { getCarBrands, getCars } from '../../redux/cars/operations';
import { changeFilter } from '../../redux/filters/slice';
import CustomSelect from '../CustomSelect/CustomSelect';

export default function FiltersBar() {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(getCarBrands());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch(getCars(1));
  };

  const handleChange = value => {
    dispatch(changeFilter(value));
  };

  const handleChangeMileage = e => {
    handleChange({ [e.target.name]: e.target.value });
  };
  const prices = useSelector(selectPrices);

  // const handleBrandChange = e => {
  //   dispatch(setSelectedBrand(e.target.value));
  // };

  // const handlePriceChange = e => {
  //   dispatch(setSelectedPrice(e.target.value));
  // };

  // const handleMileageChange = e => {
  //   dispatch(setSelectedMileage(e.target.value));
  // };

  // const cars = useSelector(state => state.cars.items);

  const initialValues = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

  // const brandFieldId = useId();
  // const priceFieldId = useId();
  // const mileageFieldId = useId();

  // const handleSubmit = values => {
  //   applyFilters(values);
  // };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.filtersForm}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="brand">
            Car brand
          </label>
          <Field
            component={CustomSelect}
            options={brands}
            placeholder={'Choose a brand'}
            name="brand"
            id="brand"
            onChange={handleChange}
          />
          {/* <option className={css.option} value="">
              Choose a brand
            </option>
            {brands.map(brand => (
              <option className={css.option} key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Field> */}
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="price">
            Price/1 hour
          </label>
          <Field
            component={CustomSelect}
            options={prices}
            placeholder={'Choose a price'}
            name="brand"
            id="brand"
            onChange={handleChange}
          />
          {/* <option className={css.option} value="">
              Choose a price
            </option>
            {prices.map(price => (
              <option className={css.option} key={price} value={price}>
                ${price}
              </option>
            ))}
          </Field> */}
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="minMileage">
            Car mileage / km
          </label>
          <div>
            <Field
              className={css.inputFirstWrapper}
              type="text"
              id="minMileage"
              name="minMileage"
              placeholder="From"
              value={filters.minMileage}
              onChange={handleChangeMileage}
            />
            <Field
              className={css.inputSecondWrapper}
              type="text"
              name="maxMileage"
              placeholder="To"
              value={filters.maxMileage}
              onChange={handleChangeMileage}
            />
          </div>
        </div>
        <button className={css.filterBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
