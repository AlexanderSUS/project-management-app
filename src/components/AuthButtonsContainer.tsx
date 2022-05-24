import React from 'react';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import AppRoutes from '../constants/routes';
import { logOut } from '../store/authSlice';
import { TOKEN } from '../constants/authorization';
import HeaderButton from './HeaderButton';

type AuthButtonsContainerProps = {
  userId: string;
};

const AuthButtonsContainer: React.FC<AuthButtonsContainerProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logOutUser = () => {
    localStorage.removeItem(TOKEN);
    dispatch(logOut());
  };

  if (location.pathname === AppRoutes.LOGIN) {
    return (
      <HeaderButton onClick={() => navigate(AppRoutes.REGISTRATION)} text={t('AuthText.SIGN_UP')} />
    );
  }

  if (location.pathname === AppRoutes.REGISTRATION) {
    return <HeaderButton onClick={() => navigate(AppRoutes.LOGIN)} text={t('AuthText.LOG_IN')} />;
  }

  return userId ? (
    <HeaderButton onClick={logOutUser} text={t('AuthText.LOG_OUT')} />
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <HeaderButton onClick={() => navigate(AppRoutes.LOGIN)} text={t('AuthText.LOG_IN')} />
      </Grid>
      <Grid item>
        <HeaderButton onClick={() => navigate(AppRoutes.REGISTRATION)} text={t('AuthText.SIGN_UP')} />
      </Grid>
    </Grid>
  );
};
export default AuthButtonsContainer;
