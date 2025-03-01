import { useSelector, useDispatch } from 'react-redux';
// import { selectPrices } from '../../redux/filters/selectors';
import { selectBrands } from '../../redux/cars/selectors';
import { Formik, Field, Form } from 'formik';
import css from './FiltersBar.module.css';
import { useEffect } from 'react';
import { getCarBrands, getCars } from '../../redux/cars/operations';
import { changeFilter, initialState } from '../../redux/filters/slice';
import CustomSelect from '../CustomSelect/CustomSelect';

export default function FiltersBar({ page, setPage }) {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);

  useEffect(() => {
    dispatch(getCarBrands());
  }, [dispatch]);

  const handleSubmit = values => {
    setPage(1);
    dispatch(changeFilter(initialState.filters));
    dispatch(changeFilter(values));
    if (page === 1) {
      dispatch(getCars(1));
    }
  };
  // const prices = useSelector(selectPrices);

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
            options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            placeholder={'Choose a price'}
            name="price"
            id="price"
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
            />
            <Field
              className={css.inputSecondWrapper}
              type="text"
              name="maxMileage"
              placeholder="To"
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
