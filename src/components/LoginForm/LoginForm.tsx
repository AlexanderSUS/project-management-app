/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SIGNIN_INPUTS } from '../../app/constants/authorization';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { SignInFormInput } from '../../types/authTypes';
import { clearAuthError, login } from '../../store/authSlice';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import FormField from '../FormField/FormField';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SignInFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
    reset();
    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(clearAuthError());
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNIN_INPUTS.map((input) => (
        <div key={input.properties.id}>
          <FormField
            id={input.properties.id}
            label={input.labelText}
            variant="outlined"
            inputProps={{
              ...register(input.properties.id as keyof SignInFormInput, {
                ...input.registerOptions,
              }),
              ...input.properties,
            }}
          />
          {errors[input.properties.id as keyof typeof errors] && (
            <Typography component="p">
              {errors[input.properties.id as keyof typeof errors]?.message}
            </Typography>
          )}
        </div>
      ))}
      <ButtonSubmit />
    </form>
  );
};
export default LoginForm;
