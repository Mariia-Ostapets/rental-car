import css from './AppBar.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function AppBar() {
  return (
    <header className={css.appBar}>
      <Logo />
      <Navigation />
    </header>
  );
}
