/* eslint-disable no-restricted-globals */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import AppRoutes from '../../app/constants/routes';
import { authSelector, logOut } from '../../store/authSlice';
import { AuthText } from '../../app/constants/authorization';

const AuthButtonsContainer: React.FC = () => {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  return (
    isAuth
      ? <button type="button" onClick={() => dispatch(logOut())}>{AuthText.LOG_OUT}</button>
      : (
        <>
          <Link to={AppRoutes.AUTH}>
            {AuthText.LOG_IN}
          </Link>
          <Link to={AppRoutes.AUTH}>
            {AuthText.SIGN_UP}
          </Link>
        </>
      )

  );
};
export default AuthButtonsContainer;
