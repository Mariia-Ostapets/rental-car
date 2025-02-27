import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, selectPrices } from '../../redux/filters/selectors';
import { selectBrands } from '../../redux/cars/selectors';
import { Formik, Field, Form } from 'formik';
import css from './FiltersBar.module.css';
import { useEffect } from 'react';
import { getCarBrands, getCars } from '../../redux/cars/operations';
import { changeFilter } from '../../redux/filters/slice';
import CustomSelect from '../CustomSelect/CustomSelect';

export default function FiltersBar() {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);
  console.log('brands:', brands);
  console.log('filters:', filters);

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
  console.log('prices:', prices);

  const initialValues = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

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
