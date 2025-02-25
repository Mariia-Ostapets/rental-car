import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={css.logo}>
      <svg width={104} height={16}>
        <use href="/sprite.svg#icon-logo"></use>
      </svg>
    </Link>
  );
}
