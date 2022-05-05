/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppRoutes from '../../app/constants/routes';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { authSelector } from '../../store/authSlice';
import Header from '../Header/Header';

const Layout = () => {
  const { isAuth } = useAppSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoutes.PROJECTS);
    } else {
      navigate(AppRoutes.WELCOME);
    }
  }, [isAuth]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
