import {
  Alert,
  Box, Container, Typography, AlertTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../components/RegistrationFrom';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData, clearAuthError } from '../store/authSlice';
import Loader from '../components/Loader';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { newUser, error, isLoading } = useSelector(authSelector);

  useEffect(() => () => {
    if (newUser) {
      dispatch(removeNewUserData());
    }
  }, [dispatch, newUser]);

  // TODO find solution to fix eslint error,
  // DO NOT PUT error.message in dependency!!!!
  // it cause ERRASE the error MESSAGE  adnd
  // excessive dispatch call
  useEffect(() => () => {
    if (error.message) {
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
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('registrationPageText.title')}
        </Typography>
        {isLoading && <Loader /> }
        {!isLoading && newUser && (
          <Alert severity="success" sx={{ m: '1rem' }}>
            <AlertTitle>{t('registrationText.success')}</AlertTitle>
            <strong>
              {t('registrationText.name')}
              {newUser.name}
              <br />
              {t('registrationText.login')}
              {newUser.login}
            </strong>
            <br />
            {t('registrationPageText.successSignUp')}
          </Alert>
        )}
        {!isLoading && !newUser && (
        <>
          <RegistrationForm />
          {error.message && <Alert sx={{ mb: '1rem' }} severity="error">{error.message}</Alert>}
        </>
        )}
      </Box>
    </Container>
  );
};

export default Registration;
