import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { loginPage } from '../../constants/text';
import LoginForm from '../../components/LoginForm';
import { authSelector } from '../../store/authSlice';

const Login: React.FC = () => {
  const { error } = useSelector(authSelector);

  return (
    <>
      <Typography component="h1" variant="h3">
        {loginPage.title}
      </Typography>
      <LoginForm />
      {error.message && <p>{error.message}</p>}
    </>
  );
};
export default Login;
