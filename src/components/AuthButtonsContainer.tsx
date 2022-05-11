import React from 'react';
import { Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import AppRoutes from '../constants/routes';
import { logOut } from '../store/authSlice';
import { AuthText, TOKEN } from '../constants/authorization';
import LinkStyled from './LinkStyled';

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
    return <LinkStyled to={AppRoutes.REGISTRATION}>{AuthText.SIGN_UP}</LinkStyled>;
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return <LinkStyled to={AppRoutes.LOGIN}>{AuthText.LOG_IN}</LinkStyled>;
  }

  return userId ? (
    <Button type="button" onClick={logOutUser}>
      {AuthText.LOG_OUT}
    </Button>
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <LinkStyled to={AppRoutes.LOGIN}>{AuthText.LOG_IN}</LinkStyled>
      </Grid>
      <Grid item>
        <LinkStyled to={AppRoutes.REGISTRATION}>{AuthText.SIGN_UP}</LinkStyled>
      </Grid>
    </Grid>
  );
};
export default AuthButtonsContainer;
