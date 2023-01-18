import css from './Layout.module.css';
import { Outlet, NavLink, Link } from 'react-router-dom';
const Layout = () => {
  return (
    <div>
      <ul className={css.list}>
        <li className={css.item}>
          <Link to="/" className={css.link}>
            Home
          </Link>
        </li>
        <li className={css.item}>
          <Link to="dfdfdfdf" className={css.link}>
            Movies
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Layout;
