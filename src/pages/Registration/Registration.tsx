import React from 'react';
import { useSelector } from 'react-redux';
import { registrationText } from '../../app/constants/text';
import RegistrationForm from '../../components/RegistrationForm/RegistrationFrom';
import { authSelector } from '../../store/authSlice';

const Registration: React.FC = () => {
  const { newUser, error } = useSelector(authSelector);

  return (newUser.login ? (
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
    )
  );
};

export default Registration;
