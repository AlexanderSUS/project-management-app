import { AppBar, Grid } from '@mui/material';
import React from 'react';
import AppRoutes from '../../app/constants/routes';
import { navText } from '../../app/constants/text';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { authSelector } from '../../store/authSlice';
import AuthButtonsContainer from '../AuthButtonsContainer/AuthButtonsContainer';
import GridFlexGrow from '../GridFlexGrow/GridFlexGrow';
import LinkStyled from '../LinkStyled/LinkStyled';

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);

  return (
    <AppBar position="static" sx={{ padding: '15px' }}>
      <Grid container spacing={2}>
        <GridFlexGrow>
          <LinkStyled to={AppRoutes.WELCOME}>{navText.home}</LinkStyled>
        </GridFlexGrow>
        {userId && (
          <GridFlexGrow>
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
