import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import AppRoutes from '../../app/constants/routes';
import { logOut } from '../../store/authSlice';
import { AuthText, TOKEN } from '../../app/constants/authorization';

type AuthButtonsContainerProps = {
  userId: string | null;
};

const AuthButtonsContainer: React.FC<AuthButtonsContainerProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const logOutUser = () => {
    localStorage.removeItem(TOKEN);
    dispatch(logOut());
  };

  if (location.pathname === AppRoutes.LOGIN) {
    return (
      <Link to={AppRoutes.REGISTRATION}>
        {AuthText.SIGN_UP}
      </Link>
    );
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return (
      <Link to={AppRoutes.LOGIN}>
        {AuthText.LOG_IN}
      </Link>
    );
  }

  return (
    userId
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
