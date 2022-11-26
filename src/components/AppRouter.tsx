import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from '../constants/routes';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import Registration from '../pages/Registration';
import Welcome from '../pages/Welcome';
import Layout from './Layout';
import EditProfile from '../pages/EditProfile';
import Board from './Board';

function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.WELCOME} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTRATION} element={<Registration />} />
        <Route path={AppRoutes.PROJECTS} element={<Projects />}>
          <Route path={AppRoutes.BOARD_ID} element={<Board />} />
        </Route>
        <Route path={AppRoutes.EDIT_PROFILE} element={<EditProfile />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
