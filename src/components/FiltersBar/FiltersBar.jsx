import css from './FiltersBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { selectBrands } from '../../redux/cars/selectors';
import { getCarBrands, getCars } from '../../redux/cars/operations';
import { changeFilter, initialState } from '../../redux/filters/slice';
import CustomSelect from '../CustomSelect/CustomSelect';
import { handleMileageInput, clearMileageInput } from '../../utils';
// Даний код допрацюю пізніше
// import { setRentalPrices } from '../../redux/cars/slice';
// import { selectRentalPrices } from '../../redux/cars/selectors';

export default function FiltersBar({ page, setPage }) {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
  const [minMileageValue, setMinMileage] = useState('');
  const [maxMileageValue, setMaxMileage] = useState('');
  // Даний код допрацюю пізніше
  // const rentalPrices = useSelector(selectRentalPrices);
  // console.log(rentalPrices);

  useEffect(() => {
    dispatch(getCarBrands());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'minMileage') {
      setMinMileage(handleMileageInput(value, 'From '));
    } else if (name === 'maxMileage') {
      setMaxMileage(handleMileageInput(value, 'To '));
    }
  };

  const handleSubmit = values => {
    setPage(1);
    dispatch(changeFilter(initialState.filters));
    dispatch(
      changeFilter({
        ...values,
        minMileage: clearMileageInput(minMileageValue),
        maxMileage: clearMileageInput(maxMileageValue),
      })
    );
    if (page === 1) {
      dispatch(getCars(1));
    }
  };

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
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="price">
            Price/1 hour
          </label>
          <Field
            component={CustomSelect}
            options={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            // Даний код допрацюю пізніше
            // options={rentalPrices}
            placeholder={'Choose a price'}
            name="rentalPrice"
            id="price"
          />
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
              onChange={handleChange}
              value={minMileageValue}
            />
            <Field
              className={css.inputSecondWrapper}
              type="text"
              name="maxMileage"
              placeholder="To"
              onChange={handleChange}
              value={maxMileageValue}
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
