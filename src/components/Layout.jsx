import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage, clearMessage } from '../redux/usersession/usersessionsSlice';
import Header from './Header';

const Layout = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

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
    <section className="flex flex-col lg:flex-row h-screen">
      <header className="lg:w-1/5 border-r border-slate-200">
        <Header />
      </header>

      <main className="w-full h-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
