import React from 'react';
import { useSelector } from 'react-redux';
import {
  Alert, Box, Container, Typography, Button,
} from '@mui/material';
import Loader from '../components/Loader';
import { editProfilePageText } from '../constants/text';
import { authSelector } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { EDIT_LOGIN, EDIT_NAME, REMOVE_USER } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import { notificationSelector } from '../store/notificationSlice';

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName, login } = useSelector(authSelector);
  const { error, isLoading } = useAppSelector(notificationSelector);

  const deleteAccount = () => {
    dispatch(openModal(REMOVE_USER));
  };

  const editName = () => {
    dispatch(openModal(EDIT_NAME));
  };

  const editLogin = () => {
    dispatch(openModal(EDIT_LOGIN));
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>{editProfilePageText.title}</Typography>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <Alert sx={{ mb: '1rem' }} severity="error">
          {error}
        </Alert>
      )}
      {!isLoading && !error && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box>
              <Typography variant="h5">
                {editProfilePageText.name}
                {userName}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {editProfilePageText.login}
                {' '}
                {login}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {editProfilePageText.id}
                {userId}
              </Typography>
            </Box>
            <Box>
              <Box>
                <Button onClick={editName}>
                  {editProfilePageText.edit}
                </Button>
              </Box>
              <Box>
                <Button onClick={editLogin}>
                  {editProfilePageText.edit}
                </Button>
              </Box>
            </Box>
          </Box>
          <Button variant="outlined" color="warning" onClick={deleteAccount}>
            {editProfilePageText.deleteAccount}
          </Button>
        </>
      )}
    </Container>
  );
};

export default EditProfile;
