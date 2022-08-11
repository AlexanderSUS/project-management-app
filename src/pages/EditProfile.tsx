import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, Typography, Button, Card, CardContent, Box, Tooltip, IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../components/Loader';
import { authSelector } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { EDIT_LOGIN, EDIT_NAME, REMOVE_USER } from '../constants/formfields';
import { openModal, setDefaultValues } from '../store/modalSlice';
import { notificationSelector } from '../store/notificationSlice';
import UserTasks from '../components/UserTasks';
import { getBoards, getBoardsById } from '../store/boardSlice';
import muiTheme from '../constants/muiTheme';

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
    <Box component="main" sx={{ bgcolor: muiTheme.palette.primary.light, flex: '1', pb: '1rem' }}>
      <Loader isOpen={isLoading} />
      <Container maxWidth="md" sx={{ pb: '1rem' }}>
        <Typography component="h2" variant="h2" color="white" sx={{ m: '1rem 0', fontWeight: '500' }}>
          {t('profilePage.title')}
        </Typography>
        <Card sx={{ m: '2rem 0', pl: '2rem', boxShadow: 5 }}>
          <CardContent>
            <Box sx={lineStyle}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {t('profilePage.name')}
                {userName}
              </Typography>
              <Tooltip title={t('profilePage.edit')}>
                <IconButton onClick={editName}>
                  <EditIcon color="warning" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={lineStyle}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {t('profilePage.login')}
                {login}
              </Typography>
              <Tooltip title={t('profilePage.edit')}>
                <IconButton onClick={editLogin}>
                  <EditIcon color="warning" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="h5" color="pallete.secondary.light" gutterBottom>
              {t('profilePage.id')}
              {userId}
            </Typography>
            <Button variant="contained" color="warning" onClick={deleteAccount}>
              {t('profilePage.deleteAccount')}
            </Button>
          </CardContent>
        </Card>
        <UserTasks userId={userId} />
      </Container>
    </Box>
  );
};

export default EditProfile;
