import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <svg width={104} height={16}>
        <use href="/sprite.svg#icon-logo"></use>
      </svg>
    </Link>
  );
}
