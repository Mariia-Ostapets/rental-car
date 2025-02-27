import { useState } from 'react';
import css from './CustomSelect.module.css';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../redux/filters/selectors';
import clsx from 'clsx';

export default function CustomSelect({
  id,
  field,
  placeholder,
  options,
  onChange,
  form,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const filters = useSelector(selectFilters);
  console.log('filters:', filters);

  return (
    <button
      className={css.customSelect}
      type="button"
      id={id}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {field.name === 'rentalPrice' && (
        <span className={css.selectPlaceholder}>
          {filters.rentalPrice || placeholder}
        </span>
      )}
      {field.name === 'brand' && (
        <span className={css.selectPlaceholder}>
          {filters.brand || placeholder}
        </span>
      )}
      <div className={css.arrowIcon}>
        <svg width={16} height={16}>
          <use
            href={`/sprite.svg#${
              isOpen ? 'icon-chevron-up' : 'icon-chevron-down'
            }`}
          />
        </svg>
      </div>
      <div
        className={clsx(
          css.listContainer,
          isOpen && css.visible,
          field.name === 'rentalPrice' && css.priceHeight
        )}
      >
        <ul className={clsx(css.optionsList)}>
          {options !== null &&
            options.map(item => {
              return (
                <li
                  className={css.option}
                  key={item}
                  onClick={() => {
                    setIsOpen(false);
                    form.setFieldValue(field.name, item);
                    onChange({ [field.name]: item });
                  }}
                >
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
    </button>
  );
}
