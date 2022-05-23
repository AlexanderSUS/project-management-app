import React from 'react';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SIGNIN_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignInFormInput } from '../types/authTypes';
import { logIn } from '../store/authSlice';
import convertRulesRegExp from '../helpers/ConvertRulesRegExp';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control, formState: { errors } } = useForm<SignInFormInput>({ mode: 'onChange' });

  const onSubmit = (data: SignInFormInput) => {
    dispatch(logIn(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNIN_INPUTS.map((input) => (
        <Controller
          key={input.name}
          name={input.name as keyof SignInFormInput}
          control={control}
          rules={convertRulesRegExp(input.registerOptions)}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              fullWidth
              id={input.name}
              label={t(input.label)}
              type={input.type}
              value={value}
              onChange={onChange}
              autoComplete={input.autoComplete}
              error={!!errors[input.name as keyof typeof errors]}
              helperText={errors[input.name as keyof typeof errors]
              && t(`${errors[input.name as keyof typeof errors]?.message}`)}
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
