import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage, clearMessage, selectUser } from '../redux/usersession/usersessionsSlice';
import Header from './Header';

const Layout = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [message, dispatch]);

  return (
    <>
      <header>
        <Header />
        {user && <h3 className="text-blue-600 font-bold text-xl">{`Welcome, ${user.name}!`}</h3>}
        {message && <p className="text-green-500">{message}</p>}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
