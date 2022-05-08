import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
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
        <Typography component="span">{AuthText.SIGN_UP}</Typography>
      </Link>
    );
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return (
      <Link to={AppRoutes.LOGIN}>
        <Typography component="span">{AuthText.LOG_IN}</Typography>
      </Link>
    );
  }

  return userId ? (
    <Button type="button" onClick={logOutUser}>
      {AuthText.LOG_OUT}
    </Button>
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <Link to={AppRoutes.LOGIN}>
          <Typography component="span">{AuthText.LOG_IN}</Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link to={AppRoutes.REGISTRATION}>
          <Typography component="span">{AuthText.SIGN_UP}</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
export default AuthButtonsContainer;
