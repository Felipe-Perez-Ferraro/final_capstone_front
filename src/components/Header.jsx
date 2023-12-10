import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../redux/usersession/usersessionsSlice';
import Logout from './Logout';

const Header = () => {
  const user = useSelector(selectUser);
  const links = [
    { path: '/', text: 'Boats' },
    { path: '/reservations', text: 'Reservations' },
    ...(user ? [] : [{ path: '/login', text: 'Login' }, { path: '/signup', text: 'Signup' }]),
  ];

  return (
    <header>
      <nav>
        <ul>
          {links.map(({ path, text }) => (
            <li key={text}>
              <NavLink to={path}>
                {text}
              </NavLink>
            </li>
          ))}
          {user && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
