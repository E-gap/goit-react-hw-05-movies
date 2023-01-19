import css from './Layout.module.css';
import { Outlet, NavLink } from 'react-router-dom';
const Layout = () => {
  return (
    //const ааа = 'active' ? 'css.link css.active' : 'css.link';

    <div>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="movies" className={css.link}>
            Movies
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Layout;
