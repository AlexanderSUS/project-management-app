import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { registrationPageText, registrationText } from '../../constants/text';
import RegistrationForm from '../../components/RegistrationFrom';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData } from '../../store/authSlice';
import Loader from '../../components/Loader';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newUser, error, isLoading } = useSelector(authSelector);

  useEffect(() => () => { dispatch(removeNewUserData()); }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {registrationPageText.title}
        </Typography>
        {isLoading && <Loader /> }
        {!isLoading && newUser ? (
          <>
            <Typography component="h4" variant="h4">
              {registrationText.success}
            </Typography>
            <Typography component="p">
              {registrationText.name}
              {newUser.name}
            </Typography>
            <Typography component="p">
              {registrationText.login}
              {newUser.login}
            </Typography>
          </>
        ) : (
          <>
            <RegistrationForm />
            {error.message && <p>{error.message}</p>}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Registration;
