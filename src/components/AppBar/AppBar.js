import Navigation from '../Navigation/Navigation';
import s from './AppBars.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
