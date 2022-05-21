import {
  Typography, Container, Box, Avatar, Alert,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { authSelector, clearAuthError, logIn } from '../store/authSlice';
import Loader from '../components/Loader';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import AuthForm from '../components/AuthForm';
import { SIGNIN_INPUTS } from '../constants/authorization';

const Login: React.FC = () => {
  const { error, isLoading } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // TODO find solution to fix eslint error,
  // DO NOT PUT error.message in dependency!!!!
  // it cause excessive dispatch call
  useEffect(() => () => {
    if (error) {
      dispatch(clearAuthError());
    }
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('loginPage.title')}
        </Typography>
        {isLoading && <Loader />}
        {!isLoading && error && <Alert sx={{ mb: '1rem' }} severity="error">{error}</Alert>}
        {!isLoading && !error
        && <AuthForm action={logIn} fields={SIGNIN_INPUTS} buttonText={t('loginPage.title')} />}
      </Box>
    </Container>
  );
};
export default Login;
