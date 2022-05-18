import {
  Typography, Container, Box, Avatar, Alert,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm';
import { authSelector, clearAuthError } from '../store/authSlice';
import Loader from '../components/Loader';
import { useAppDispatch } from '../hooks/reduxTypedHooks';

const Login: React.FC = () => {
  const { error, isLoading } = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // TODO find solution to fix eslint error,
  // DO NOT PUT error.message in dependency!!!!
  // it cause excessive dispatch call
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('loginPage.title')}
        </Typography>
        {isLoading ? <Loader />
          : (
            <>
              <LoginForm />
              {error.message && <Alert sx={{ mb: '1rem' }} severity="error">{error.message}</Alert>}
            </>
          )}
      </Box>
    </Container>
  );
};
export default Login;
