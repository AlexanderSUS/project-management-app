import {
  Typography, Container, Box, Avatar,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loginPage } from '../../constants/text';
import LoginForm from '../../components/LoginForm';
import { authSelector, clearAuthError } from '../../store/authSlice';
import Loader from '../../components/Loader';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';

const Login: React.FC = () => {
  const { error, isLoading } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => () => {
    if (error.message) {
      dispatch(clearAuthError());
    }
  }, [error.message]);

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {loginPage.title}
        </Typography>
        {isLoading ? <Loader />
          : (
            <>
              <LoginForm />
              {error.message && <p>{error.message}</p>}
            </>
          )}
      </Box>
    </Container>
  );
};
export default Login;
