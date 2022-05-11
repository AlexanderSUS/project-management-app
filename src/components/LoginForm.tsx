import React from 'react';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { SIGNIN_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignInFormInput } from '../types/authTypes';
import { login } from '../store/authSlice';
import { loginPage } from '../constants/text';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm<SignInFormInput>({ mode: 'onChange' });

  const onSubmit = (data: SignInFormInput) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNIN_INPUTS.map((input) => (
        <Controller
          key={input.properties.id}
          name={input.properties.id as keyof SignInFormInput}
          control={control}
          defaultValue=""
          rules={input.registerOptions}
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              fullWidth
              id={input.properties.id}
              label={input.labelText}
              type={input.properties.type}
              value={value}
              onChange={onChange}
              error={!!errors[input.properties.id as keyof typeof errors]}
              helperText={errors[input.properties.id as keyof typeof errors]
              && errors[input.properties.id as keyof typeof errors]?.message}
            />
          )}
        />
      ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loginPage.title}
      </Button>
    </form>
  );
};
export default LoginForm;
