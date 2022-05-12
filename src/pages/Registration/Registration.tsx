import {
  Alert,
  Box, Container, Typography, AlertTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { registrationPageText, registrationText } from '../../constants/text';
import RegistrationForm from '../../components/RegistrationFrom';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData, clearAuthError } from '../../store/authSlice';
import Loader from '../../components/Loader';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newUser, error, isLoading } = useSelector(authSelector);

  useEffect(() => () => {
    if (newUser) {
      dispatch(removeNewUserData());
    }
  }, [dispatch, newUser]);

  useEffect(() => () => {
    dispatch(clearAuthError());
  }, [error.message, dispatch]);

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
          {registrationPageText.title}
        </Typography>
        {isLoading && <Loader /> }
        {!isLoading && newUser && (
          <Alert severity="success" sx={{ m: '1rem' }}>
            <AlertTitle>{registrationText.success}</AlertTitle>
            <strong>
              {registrationText.name}
              {newUser.name}
              <br />
              {registrationText.login}
              {newUser.login}
            </strong>
            <br />
            {registrationPageText.successSignUp}
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
