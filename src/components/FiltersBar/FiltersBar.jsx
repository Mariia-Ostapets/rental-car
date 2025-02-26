import { useSelector } from 'react-redux';
// import { setFilter } from '../../redux/filters/slice';
// import {
//   selectFilters,
//   selectAvailableBrands,
//   selectAvailablePrices,
//   // selectAvailableMileages,
// } from '../../redux/filters/selectors';
// import { getFiltersData } from '../../redux/filters/operations';
// import { useEffect } from 'react';
// import { getCars } from '../../redux/cars/operations';
import {
  // setSelectedBrand,
  // setSelectedMileage,
  // setSelectedPrice,
  // resetFilters,
  applyFilters,
} from '../../redux/filters/slice';
import { selectBrands, selectPrices } from '../../redux/filters/selectors';
// import { selectTotalPages } from '../../redux/cars/selectors';
import { Formik, Field, Form } from 'formik';
// import { useId } from 'react';
import css from './FiltersBar.module.css';

export default function FiltersBar() {
  // const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
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

  const cars = useSelector(state => state.cars.items);

  console.log('State Items:', cars);
  console.log('State Brands:', brands);
  console.log('State Prices:', prices);

  const initialValues = {
    brand: ' ',
    price: '',
    minMileage: '',
    maxMileage: '',
  };

  // const brandFieldId = useId();
  // const priceFieldId = useId();
  // const mileageFieldId = useId();

  const handleSubmit = values => {
    applyFilters(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.filtersForm}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="brandFieldId">
            Car brand
          </label>
          <Field
            className={css.select}
            as="select"
            name="brand"
            id="brandFieldId"
          >
            <option className={css.option} value="">
              Choose a brand
            </option>
            {brands.map(brand => (
              <option className={css.option} key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Field>
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="priceFieldId">
            Price/1 hour
          </label>
          <Field
            className={css.select}
            as="select"
            name="price"
            id="priceFieldId"
          >
            <option className={css.option} value="">
              Choose a price
            </option>
            {prices.map(price => (
              <option className={css.option} key={price} value={price}>
                ${price}
              </option>
            ))}
          </Field>
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor="mileageFieldId">
            Car mileage / km
          </label>
          <div>
            <Field
              className={css.inputFirstWrapper}
              type="number"
              name="mileageFieldId1"
              placeholder="From"
            />
            <Field
              className={css.inputSecondWrapper}
              type="number"
              name="mileageFieldId2"
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
