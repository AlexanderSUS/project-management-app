import React from 'react';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import AppRoutes from '../constants/routes';
import { logOut } from '../store/authSlice';
import { AuthText, TOKEN } from '../constants/authorization';
import HeaderButton from './HeaderButton';

type AuthButtonsContainerProps = {
  userId: string | null;
};

const AuthButtonsContainer: React.FC<AuthButtonsContainerProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem(TOKEN);
    dispatch(logOut());
  };

  if (location.pathname === AppRoutes.LOGIN) {
    return (
      <HeaderButton
        onClick={() => navigate(AppRoutes.REGISTRATION)}
        text={AuthText.SIGN_UP}
      />
    );
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return <HeaderButton onClick={() => navigate(AppRoutes.LOGIN)} text={AuthText.LOG_IN} />;
  }

  return userId ? (
    <HeaderButton onClick={logOutUser} text={AuthText.LOG_OUT} />
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <HeaderButton onClick={() => navigate(AppRoutes.LOGIN)} text={AuthText.LOG_IN} />
      </Grid>
      <Grid item>
        <HeaderButton onClick={() => navigate(AppRoutes.REGISTRATION)} text={AuthText.SIGN_UP} />
      </Grid>
    </Grid>
  );
};
export default AuthButtonsContainer;
