import css from './CustomSelect.module.css';
import { useState } from 'react';
import clsx from 'clsx';

export default function CustomSelect({
  id,
  field,
  placeholder,
  options,
  form,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={css.customSelect}
      type="button"
      id={id}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <span className={css.selectPlaceholder}>
        {field.value && field.name === 'rentalPrice'
          ? `To $${field.value}`
          : field.value || placeholder}
      </span>
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
          <li
            className={css.option}
            onClick={() => {
              setIsOpen(false);
              form.setFieldValue(field.name, '');
            }}
          >
            All
          </li>
          {options !== null &&
            options.map(item => {
              return (
                <li
                  className={css.option}
                  key={item}
                  onClick={() => {
                    setIsOpen(false);
                    form.setFieldValue(field.name, item);
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
