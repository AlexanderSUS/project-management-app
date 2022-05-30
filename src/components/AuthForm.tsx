import * as React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import convertRulesRegExp from '../helpers/convertRulesRegExp';
import { AppFormData, FormField } from '../types/formTypes';
import { AppDispatch } from '../store/store';
import { logIn, registration } from '../store/authSlice';

type AppFormProps = {
  fields: FormField[];
  action: typeof registration | typeof logIn;
  buttonText: string;
};

const AuthForm: React.FC<AppFormProps> = ({ fields, action, buttonText }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppFormData>({ mode: 'onChange' });
  const { t } = useTranslation();

  const onSubmit = (data: AppFormData) => {
    dispatch(action(data) as Parameters<AppDispatch>[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="auth-form">
      {fields
        && fields.map((input) => (
          <Controller
            key={input.name}
            name={input.name as keyof AppFormData}
            control={control}
            rules={convertRulesRegExp(input.registerOptions)}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                type={input.type}
                placeholder={t(input.placeholder)}
                fullWidth
                label={t(input.label)}
                onChange={onChange}
                value={value}
                autoComplete="off"
                error={!!errors[input.name as keyof typeof errors]}
                helperText={
                  errors[input.name as keyof typeof errors]
                  && t(`${errors[input.name as keyof typeof errors]?.message}`)
                }
              />
            )}
          />
        ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonText}
      </Button>
    </form>
  );
};

export default AuthForm;
