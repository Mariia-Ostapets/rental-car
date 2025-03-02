import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import DocumentTitle from '../../components/ui/DocumentTitle';

export default function NotFoundPage() {
  return (
    <div>
      <DocumentTitle>RentalCar Not Found</DocumentTitle>
      <div className={css.notFoundWrapper}>
        <BiError size={54} />
        <h1>Page Not Found</h1>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
