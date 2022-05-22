import {
  Alert,
  Box, Container, Typography, AlertTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData, registration } from '../store/authSlice';
import Loader from '../components/Loader';
import AuthForm from '../components/AuthForm';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { clearError, notificationSelector } from '../store/notificationSlice';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { newUser } = useAppSelector(authSelector);
  const { error, isLoading } = useAppSelector(notificationSelector);

  useEffect(() => () => {
    if (newUser) {
      dispatch(removeNewUserData());
    }
  }, [dispatch, newUser]);

  // TODO find solution to fix eslint error,
  // DO NOT PUT error in dependency!!!!
  // it cause ERRASE the error MESSAGE  adnd
  // excessive dispatch call
  useEffect(() => () => {
    if (error) {
      dispatch(clearError());
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
          <AuthForm
            action={registration}
            fields={SIGNUP_INPUTS}
            buttonText={
              t('registrationPageText.title')
           }
          />
          {error && <Alert sx={{ mb: '1rem' }} severity="error">{error}</Alert>}
        </>
        )}
      </Box>
    </Container>
  );
};

export default Registration;
