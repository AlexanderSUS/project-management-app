import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { registrationPageText, registrationText } from '../../app/constants/text';
import RegistrationForm from '../../components/RegistrationForm/RegistrationFrom';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { authSelector, removeNewUserData } from '../../store/authSlice';

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newUser, error } = useSelector(authSelector);

  useEffect(() => () => {
    dispatch(removeNewUserData());
  }, []);

  return (
    <>
      <h1>{registrationPageText.title}</h1>
      {newUser ? (
        <>
          <h4>{registrationText.success}</h4>
          <p>
            {registrationText.name}
            {newUser.name}
          </p>
          <p>
            {registrationText.login}
            {newUser.login}
          </p>
        </>
      )
        : (
          <>
            <RegistrationForm />
            {error.message && <p>{error.message}</p>}
          </>
        )}
    </>
  );
};

export default Registration;
