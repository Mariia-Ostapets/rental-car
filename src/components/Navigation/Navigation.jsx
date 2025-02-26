import css from './Navigation.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Navigation() {
  const location = useLocation();

  const buildLinkClass = ({ isActive }) => {
    return clsx(
      css.link,
      isActive && !location.pathname.includes('catalog/') && css.active
    );
  };

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={buildLinkClass}>
        Catalog
      </NavLink>
    </nav>
  );
}
