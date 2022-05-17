import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import { SignUpFormInput } from '../types/authTypes';
import { registration } from '../store/authSlice';

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
          key={input.properties.id}
          name={input.properties.id as keyof SignUpFormInput}
          control={control}
          rules={input.registerOptions}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              fullWidth
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
        {t('registrationPageText.title')}
      </Button>
    </form>
  );
};
export default RegistrationForm;
