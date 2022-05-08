import { AppBar, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../app/constants/routes';
import { navText } from '../../app/constants/text';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { authSelector } from '../../store/authSlice';
import AuthButtonsContainer from '../AuthButtonsContainer/AuthButtonsContainer';

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);

  return (
    <AppBar position="static" sx={{ padding: '15px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          sx={{
            flexGrow: 1,
          }}
        >
          <Link to={AppRoutes.WELCOME}>
            <Typography component="span">{navText.home}</Typography>
          </Link>
        </Grid>
        {userId && (
          <Grid
            item
            sx={{
              flexGrow: 1,
            }}
          >
            <Link to={AppRoutes.PROJECTS}>
              <Typography component="span">{navText.projects}</Typography>
            </Link>
          </Grid>
        )}
        <Grid item>
          <AuthButtonsContainer userId={userId} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
