import css from './MainLayout.module.css';

export default function MainLayout({ children }) {
  return <div className={css.mainLayout}>{children}</div>;
}
