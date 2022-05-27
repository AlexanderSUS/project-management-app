import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Typography, Button, Card, CardContent, Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import { authSelector } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { EDIT_LOGIN, EDIT_NAME, REMOVE_USER } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { notificationSelector } from '../store/notificationSlice';
import UserTasks from '../components/UserTasks';
import { getBoards, getBoardsById } from '../store/boardSlice';

const lineStyle = {
  display: 'flex',
};

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, userName, login } = useSelector(authSelector);
  const { isLoading } = useAppSelector(notificationSelector);
  const { t } = useTranslation();

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
    <>
      <Loader isOpen={isLoading} />
      <Container component="main" maxWidth="md" sx={{ pb: '1rem' }}>
        <Card sx={{ m: '2rem 0', pl: '2rem' }}>
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>{t('profilePage.title')}</Typography>
            <Box sx={lineStyle}>
              <Typography variant="h5">
                {t('profilePage.name')}
                {userName}
              </Typography>
              <Button onClick={editName}>
                {t('profilePage.edit')}
              </Button>
            </Box>
            <Box sx={lineStyle}>
              <Typography variant="h5" gutterBottom>
                {t('profilePage.login')}
                {login}
              </Typography>
              <Button onClick={editLogin}>
                {t('profilePage.edit')}
              </Button>
            </Box>
            <Typography variant="h5" color="GrayText" gutterBottom>
              {t('profilePage.id')}
              {userId}
            </Typography>
            <Button variant="outlined" color="warning" onClick={deleteAccount}>
              {t('profilePage.deleteAccount')}
            </Button>
          </CardContent>
        </Card>
        <UserTasks userId={userId} />
      </Container>
    </>
  );
};

export default EditProfile;
