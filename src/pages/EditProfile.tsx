import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert, Box, Container, Avatar, Typography, TextField, Button,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import Loader from '../components/Loader';
import { editProfilePageText } from '../constants/text';
import { authSelector, editProfile } from '../store/authSlice';
import { loginAuthInput, SIGNUP_INPUTS, userAuthInput } from '../constants/authorization';
import { SignUpFormInput } from '../types/authTypes';
import { useAppDispatch } from '../hooks/reduxTypedHooks';
import UserService from '../api/userServise';

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    error, isLoading, userId,
  } = useSelector(authSelector);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SignUpFormInput>({ mode: 'onChange' });
  const onSubmit = (data: SignUpFormInput) => {
    dispatch(editProfile({
      id: userId!,
      userData: data,
    }));
  };

  useEffect(() => {
    // dispatch(getUserData(userId!));
    // const { name, login } = userData;
    // setValue(userAuthInput.properties.id as keyof SignUpFormInput, name);
    // setValue(loginAuthInput.properties.id as keyof SignUpFormInput, login);
    /* 
    * TODO: I need to change this logic
    */
    UserService.getUserData(userId!).then(
      (response) => {
        setTimeout(() => {
          const { name, login } = response.data;

          setValue(userAuthInput.properties.id as keyof SignUpFormInput, name);
          setValue(loginAuthInput.properties.id as keyof SignUpFormInput, login);
        });
      },
    );
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {editProfilePageText.title}
        </Typography>
        {isLoading && <Loader />}
        <>
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
                    label={input.labelText}
                    type={input.properties.type}
                    value={value}
                    onChange={onChange}
                    autoComplete={input.properties.autoComplete}
                    error={!!errors[input.properties.id as keyof typeof errors]}
                    helperText={
                      errors[input.properties.id as keyof typeof errors]
                      && errors[input.properties.id as keyof typeof errors]?.message
                    }
                  />
                )}
              />
            ))}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {editProfilePageText.title}
            </Button>
          </form>
          {error.message && (
            <Alert sx={{ mb: '1rem' }} severity="error">
              {error.message}
            </Alert>
          )}
        </>
        {/* {!isLoading && newUser && (
            <Alert severity="success" sx={{ m: '1rem' }}>
              <AlertTitle>{registrationText.success}</AlertTitle>
              <strong>
                {registrationText.name}
                {newUser.name}
                <br />
                {registrationText.login}
                {newUser.login}
              </strong>
              <br />
              {registrationPageText.successSignUp}
            </Alert>
          )}
          {!isLoading && !newUser && (
            <>
              <RegistrationForm />
              {error.message && (
                <Alert sx={{ mb: '1rem' }} severity="error">
                  {error.message}
                </Alert>
              )}
            </>
          )} */}
      </Box>
    </Container>
  );
};

export default EditProfile;
