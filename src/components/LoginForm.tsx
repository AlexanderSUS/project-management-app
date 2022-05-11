import React, { useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SIGNIN_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignInFormInput } from '../types/authTypes';
import { clearAuthError, login } from '../store/authSlice';
import { loginPage } from '../constants/text';

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
    if (errors.login || errors.password) {
      dispatch(clearAuthError());
    }
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNIN_INPUTS.map((input) => (
        <div key={input.properties.id}>
          <TextField
            margin="normal"
            fullWidth
            id={input.properties.id}
            label={input.labelText}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {loginPage.title}
      </Button>
    </form>
  );
};
export default LoginForm;
