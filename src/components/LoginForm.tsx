import React from 'react';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SIGNIN_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignInFormInput } from '../types/authTypes';
import { login } from '../store/authSlice';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
          rules={input.registerOptions}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              fullWidth
              id={input.properties.id}
              label={t(input.labelText)}
              type={input.properties.type}
              value={value}
              onChange={onChange}
              autoComplete={input.properties.autoComplete}
              error={!!errors[input.properties.id as keyof typeof errors]}
              helperText={errors[input.properties.id as keyof typeof errors]
              && t(`${errors[input.properties.id as keyof typeof errors]?.message}`)}
            />
          )}
        />
      ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t('loginPage.title')}
      </Button>
    </form>
  );
};
export default LoginForm;
