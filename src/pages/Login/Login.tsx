import React from 'react';
import { useSelector } from 'react-redux';
import { loginPage } from '../../app/constants/text';
import LoginForm from '../../components/LoginForm/LoginForm';
import { authSelector } from '../../store/authSlice';

const Login: React.FC = () => {
  const { error } = useSelector(authSelector);

  return (
    <>
      <h1>{loginPage.title}</h1>
      <LoginForm />
      {error.message && <p>{error.message}</p>}
    </>
  );
};
export default Login;
