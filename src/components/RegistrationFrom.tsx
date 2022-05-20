import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignUpFormInput } from '../types/authTypes';
import { registration } from '../store/authSlice';
import convertRulesRegExp from '../helpers/ConvertRulesRegExp';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control, formState: { errors } } = useForm<SignUpFormInput>({ mode: 'onChange' });

  const onSubmit = (data: SignUpFormInput) => {
    dispatch(registration(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNUP_INPUTS.map((input) => (
        <Controller
          key={input.name}
          name={input.name as keyof SignUpFormInput}
          control={control}
          rules={convertRulesRegExp(input.registerOptions)}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              fullWidth
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
        {t('registrationPageText.title')}
      </Button>
    </form>
  );
};
export default RegistrationForm;
