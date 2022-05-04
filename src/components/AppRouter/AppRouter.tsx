import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from '../../app/constants/routes';
import Auth from '../../pages/Auth/Auth';
import Error404 from '../../pages/Error404/Error404';
import Projects from '../../pages/Projects/Projects';
import Welcome from '../../pages/Welcome/Welcome';

function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.WELCOME} element={<Welcome />} />
      <Route path={AppRoutes.AUTH} element={<Auth />} />
      <Route path={AppRoutes.PROJECTS} element={<Projects />} />
      <Route path={AppRoutes.ERROR_404} element={<Error404 />} />
      <Route path="*" element={<Navigate to={AppRoutes.ERROR_404} replace />} />
    </Routes>
  );
}

export default AppRouter;
