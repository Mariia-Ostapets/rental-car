import css from './HomePage.module.css';
import DocumentTitle from '../../components/ui/DocumentTitle';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <DocumentTitle>RentalCar Home</DocumentTitle>
      <section className={css.homePageWrapper}>
        <h1 className={css.homePageTitle}>Find your perfect rental car</h1>
        <p className={css.homePageText}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.homePageBtn} to={'/catalog'}>
          View Catalog
        </Link>
      </section>
    </>
  );
}
