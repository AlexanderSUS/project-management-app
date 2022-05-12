import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { authorize, authSelector } from '../store/authSlice';
import AppRoutes from '../constants/routes';
import Error404 from '../pages/Error404/Error404';
import Login from '../pages/Login/Login';
import Projects from '../pages/Projects/Projects';
import Registration from '../pages/Registration/Registration';
import Welcome from '../pages/Welcome/Welcome';
import Layout from './Layout';
import EditProfile from '../pages/EditProfile/EditProfile';
import { TOKEN } from '../constants/authorization';

function AppRouter(): JSX.Element {
  const { userId } = useAppSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem(TOKEN);
    if (jwt) {
      dispatch(authorize(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      navigate(AppRoutes.PROJECTS);
    } else {
      navigate(AppRoutes.WELCOME);
    }
  }, [userId]);

  return (
    <Routes>
      <Route path={AppRoutes.WELCOME} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTRATION} element={<Registration />} />
        <Route path={AppRoutes.PROJECTS} element={<Projects />} />
        <Route path={AppRoutes.EDIT_PROFILE} element={<EditProfile />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
