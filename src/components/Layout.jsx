import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <>
    <header>
      <Header />
    </header>

    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
