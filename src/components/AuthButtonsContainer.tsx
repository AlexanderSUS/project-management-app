import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AirplayIcon from '@mui/icons-material/Airplay';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import AppRoutes from '../constants/routes';
import { logOut } from '../store/authSlice';
import HeaderButton from './HeaderButton';

type AuthButtonsContainerProps = {
  userId: string;
};

const AuthButtonsContainer: React.FC<AuthButtonsContainerProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (location.pathname === AppRoutes.LOGIN) {
    return (
      <HeaderButton
        Icon={AirplayIcon}
        text={t('AuthText.SIGN_UP')}
        onClick={() => navigate(AppRoutes.REGISTRATION)}
      />
    );
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return (
      <HeaderButton
        text={t('AuthText.LOG_IN')}
        Icon={LoginIcon}
        onClick={() => navigate(AppRoutes.LOGIN)}
      />
    );
  }

  return userId ? (
    <HeaderButton Icon={LogoutIcon} onClick={() => dispatch(logOut())} text={t('AuthText.LOG_OUT')} />
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <HeaderButton
          text={t('AuthText.LOG_IN')}
          Icon={LogoutIcon}
          onClick={() => navigate(AppRoutes.LOGIN)}
        />
      </Grid>
      <Grid item>
        <HeaderButton
          text={t('AuthText.SIGN_UP')}
          Icon={AirplayIcon}
          onClick={() => navigate(AppRoutes.REGISTRATION)}
        />
      </Grid>
    </Grid>
  );
};
export default AuthButtonsContainer;
