import React from 'react';
import {
  Alert, Box, Container, Avatar, Typography, TextField, Button,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { editProfilePageText } from '../constants/text';
import { authSelector } from '../store/authSlice';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { SignUpFormInput } from '../types/authTypes';

const EditProfile: React.FC = () => {
  const {
    error, isLoading,
  } = useSelector(authSelector);
  const {
    control,
    formState: { errors },
  } = useForm<SignUpFormInput>({ mode: 'onChange' });

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
          <form>
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
