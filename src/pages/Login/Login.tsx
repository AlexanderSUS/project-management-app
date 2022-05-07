import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { authSelector } from '../../store/authSlice';

const Login: React.FC = () => {
  const { error } = useSelector(authSelector);

  return (
    <>
      <LoginForm />
      {error.message && <p>{error.message}</p>}
    </>
  );
};
export default Login;
