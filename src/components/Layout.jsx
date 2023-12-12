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
      <header className="lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-[20%] lg:border-r-2 lg:border-red-100">
        <Header />
      </header>

      <main className="lg:ml-[20%] lg:flex lg:items-center lg:h-screen">
        {user && <h3 className="text-blue-600 font-bold text-xl">{`Welcome, ${user.name}!`}</h3>}
        {message && <p className="text-purple-500">{message}</p>}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
