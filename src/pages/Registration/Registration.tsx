import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { registrationPageText, registrationText } from '../../constants/text';
import RegistrationForm from '../../components/RegistrationFrom';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData } from '../../store/authSlice';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newUser, error } = useSelector(authSelector);

  useEffect(
    () => () => {
      dispatch(removeNewUserData());
    },
    [],
  );

  return (
    <>
      <Typography component="h1" variant="h3">
        {registrationPageText.title}
      </Typography>
      {newUser ? (
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
    </>
  );
};

export default Registration;
