/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SIGNUP_INPUTS } from '../../app/constants/authorization';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { SignUpFormInput, SignUpInputType } from '../../types/authTypes';
import { clearAuthError, registration } from '../../store/authSlice';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, reset, formState: { errors, isDirty },
  } = useForm<SignUpFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => {
    reset();
    dispatch(registration(data));
  };

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        SIGNUP_INPUTS.map((input) => (
          <div key={input.properties.id}>
            <label htmlFor={input.properties.id}>
              {input.labelText}
            </label>
            <input
              {...register(input.properties.id as SignUpInputType, {
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
export default RegistrationForm;
