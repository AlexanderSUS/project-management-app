/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { SIGNUP_INPUTS } from '../../app/constants/authorization';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { SignUpFormInput } from '../../types/authTypes';
import { clearAuthError, registration } from '../../store/authSlice';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

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
    dispatch(clearAuthError());
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {SIGNUP_INPUTS.map((input) => (
        <div key={input.properties.id}>
          <TextField
            id={input.properties.id}
            label={input.labelText}
            variant="outlined"
            inputProps={{
              ...register(input.properties.id as keyof SignUpFormInput, {
                ...input.registerOptions,
              }),
              ...input.properties,
            }}
            sx={{
              mb: 1,
            }}
          />
          {errors[input.properties.id as keyof typeof errors] && (
            <Typography component="p">
              {errors[input.properties.id as keyof typeof errors]?.message}
            </Typography>
          )}
        </div>

        /*
         * TODO: Remove this after review
         */

        // <div key={input.properties.id}>
        //   <label htmlFor={input.properties.id}>
        //     {input.labelText}
        //   </label>
        //   <input
        //     {...register(input.properties.id as keyof SignUpFormInput, {
        //       ...input.registerOptions,
        //     })}
        //     {...input.properties}
        //   />
        //   {errors[input.properties.id as keyof typeof errors]
        //   && <span>{errors[input.properties.id as keyof typeof errors]?.message}</span>}
        // </div>
      ))}
      <ButtonSubmit />
    </form>
  );
};
export default RegistrationForm;
