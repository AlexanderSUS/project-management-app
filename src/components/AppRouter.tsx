import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { authSelector, getUserData } from '../store/authSlice';
import AppRoutes from '../constants/routes';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import Registration from '../pages/Registration';
import Welcome from '../pages/Welcome';
import Layout from './Layout';
import EditProfile from '../pages/EditProfile';
import { TOKEN } from '../constants/authorization';
import BoardWrapper from './BoardWrapper';

function AppRouter(): JSX.Element {
  const { userId } = useAppSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem(TOKEN);
    if (jwt) {
      dispatch(getUserData(jwt));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      navigate(AppRoutes.PROJECTS);
    } else {
      navigate(AppRoutes.WELCOME);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Routes>
      <Route path={AppRoutes.WELCOME} element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTRATION} element={<Registration />} />
        <Route path={AppRoutes.PROJECTS} element={<Projects />}>
          <Route path={AppRoutes.BOARD_ID} element={<BoardWrapper />} />
        </Route>
        <Route path={AppRoutes.EDIT_PROFILE} element={<EditProfile />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
