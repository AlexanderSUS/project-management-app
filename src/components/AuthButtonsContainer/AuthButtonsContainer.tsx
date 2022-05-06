import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import AppRoutes from '../../app/constants/routes';
import { authSelector, logOut } from '../../store/authSlice';
import { AuthText, TOKEN } from '../../app/constants/authorization';

const AuthButtonsContainer: React.FC = () => {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    localStorage.removeItem(TOKEN);
    dispatch(logOut());
  };

  return (
    isAuth
      ? <button type="button" onClick={logOutUser}>{AuthText.LOG_OUT}</button>
      : (
        <>
          <Link to={AppRoutes.LOGIN}>
            {AuthText.LOG_IN}
          </Link>
          <Link to={AppRoutes.REGISTRATION}>
            {AuthText.SIGN_UP}
          </Link>
        </>
      )
  );
};
export default AuthButtonsContainer;
