/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_INPUTS } from '../../app/constants/authorization';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { AuthFormInput, AuthInputType } from '../../types/authTypes';
import { logIn } from '../../store/authSlice';

const AuuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<AuthFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormInput> = (data) => {
    console.log(data);
    reset();
    dispatch(logIn());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        AUTH_INPUTS.map((input) => (
          <div key={input.properties.id}>
            <label htmlFor={input.properties.id}>
              {input.labelText}
            </label>
            <input
              {...register(input.properties.id as AuthInputType, {
                ...input.registerOptions,
              })}
              {...input.properties}
            />
            {errors[input.properties.id as keyof typeof errors]
            && <span>{errors[input.properties.id as keyof typeof errors]?.message}</span>}
          </div>
        ))
      }
      <input type="submit" />
    </form>
  );
};
export default AuuthForm;
