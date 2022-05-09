import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
export default Layout;
