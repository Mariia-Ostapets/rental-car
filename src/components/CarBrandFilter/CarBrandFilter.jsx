import { useState } from 'react';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCarBrands, setSelectedBrand } from './carSlice';

export default function CarBrandFilter() {
  const [isOpen, setIsOpen] = useState(false);
  //   const dispatch = useDispatch();
  //   const brands = useSelector(state => state.cars.brands);
  //   const selectedBrand = useSelector(state => state.cars.selectedBrand);

  //   useEffect(() => {
  //     dispatch(fetchCarBrands());
  //   }, [dispatch]);

  //   const handleSelectChange = event => {
  //     dispatch(setSelectedBrand(event.target.value));
  //   };

  return (
    <div className="select-wrapper">
      <label htmlFor="carBrand">Car brand</label>
      <div className="select-container">
        <select
          id="carBrand"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          // value={selectedBrand}
          // onChange={handleSelectChange}
        >
          <option value="">Choose a brand</option>
          {/* {brands.map(brand => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))} */}
        </select>
        <svg className="select-icon" width={16} height={16}>
          <use
            href={`/sprite.svg#${
              isOpen ? 'icon-chevron-up' : 'icon-chevron-down'
            }`}
          />
        </svg>
      </div>
    </div>
  );
}
