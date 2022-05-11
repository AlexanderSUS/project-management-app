import { AppBar, Grid } from '@mui/material';
import React from 'react';
import AppRoutes from '../constants/routes';
import { navText } from '../constants/text';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { authSelector } from '../store/authSlice';
import AuthButtonsContainer from './AuthButtonsContainer';
import GridFlexGrow from './GridFlexGrow';
import LinkStyled from './LinkStyled';

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);

  return (
    <AppBar position="static" sx={{ padding: '15px' }}>
      <Grid container spacing={2}>
        <GridFlexGrow item>
          <LinkStyled to={AppRoutes.WELCOME}>{navText.home}</LinkStyled>
        </GridFlexGrow>
        {userId && (
          <GridFlexGrow item>
            <LinkStyled to={AppRoutes.PROJECTS}>{navText.projects}</LinkStyled>
          </GridFlexGrow>
        )}
        <Grid item>
          <AuthButtonsContainer userId={userId} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
