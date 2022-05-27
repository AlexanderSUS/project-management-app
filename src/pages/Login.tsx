import {
  Typography, Container, Box, Avatar,
} from '@mui/material';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { logIn } from '../store/authSlice';
import Loader from '../components/Loader';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import AuthForm from '../components/AuthForm';
import { SIGNIN_INPUTS } from '../constants/authorization';
import { notificationSelector } from '../store/notificationSlice';

const Login: React.FC = () => {
  const { isLoading } = useAppSelector(notificationSelector);
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('loginPage.title')}
        </Typography>
        <Loader isOpen={isLoading} />
        {!isLoading && <AuthForm action={logIn} fields={SIGNIN_INPUTS} buttonText={t('loginPage.title')} />}
      </Box>
    </Container>
  );
};
export default Login;
