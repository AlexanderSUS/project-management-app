import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignUpFormInput } from '../types/authTypes';
import { clearAuthError, registration } from '../store/authSlice';
import { registrationPageText } from '../constants/text';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SignUpFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => {
    reset();
    dispatch(registration(data));
  };

  useEffect(() => {
    if (errors.login || errors.name || errors.password) {
      dispatch(clearAuthError());
    }
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNUP_INPUTS.map((input) => (
        <div key={input.properties.id}>
          <TextField
            margin="normal"
            fullWidth
            id={input.properties.id}
            label={input.labelText}
            inputProps={{
              ...register(input.properties.id as keyof SignUpFormInput, {
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
        {registrationPageText.title}
      </Button>
    </form>
  );
};
export default RegistrationForm;
