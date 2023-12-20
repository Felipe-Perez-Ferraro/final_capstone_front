import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './Header';

const Layout = () => (
  <section className="flex flex-col lg:flex-row h-screen">
    <header className="lg:w-1/5 border-r border-slate-200">
      <Header />
    </header>

    <main className="w-full h-full">
      <Outlet />
    </main>
  </section>
);

export default Layout;
