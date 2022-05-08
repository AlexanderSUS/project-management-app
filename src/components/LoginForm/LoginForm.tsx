/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SIGNIN_INPUTS } from '../../app/constants/authorization';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { SignInFormInput } from '../../types/authTypes';
import { clearAuthError, login } from '../../store/authSlice';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, reset, formState: { errors, isDirty },
  } = useForm<SignInFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
    reset();
    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(clearAuthError());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        SIGNIN_INPUTS.map((input) => (
          <div key={input.properties.id}>
            <label htmlFor={input.properties.id}>
              {input.labelText}
            </label>
            <input
              {...register(input.properties.id as keyof SignInFormInput, {
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
export default LoginForm;
