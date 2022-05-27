import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Container, Typography, Button,
} from '@mui/material';
import Loader from '../components/Loader';
import { editProfilePageText } from '../constants/text';
import { authSelector } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { EDIT_LOGIN, EDIT_NAME, REMOVE_USER } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { notificationSelector } from '../store/notificationSlice';
import UserTasks from '../components/UserTasks';
import { getBoards, getBoardsById } from '../store/boardSlice';

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName, login } = useSelector(authSelector);
  const { isLoading } = useAppSelector(notificationSelector);

  const deleteAccount = () => {
    dispatch(openModal(REMOVE_USER));
  };

  const editName = () => {
    dispatch(setDefaultValues([userName]));
    dispatch(openModal(EDIT_NAME));
  };

  const editLogin = () => {
    dispatch(setDefaultValues([login]));
    dispatch(openModal(EDIT_LOGIN));
  };

  useEffect(() => {
    dispatch(getBoards())
      .then(() => {
        dispatch(getBoardsById());
      });
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>{editProfilePageText.title}</Typography>
      {isLoading && <Loader />}
      {!isLoading && (
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
          <UserTasks userId={userId} />
        </>
      )}
    </Container>
  );
};

export default EditProfile;
