import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { registration } from '../store/authSlice';
import Loader from '../components/Loader';
import AuthForm from '../components/AuthForm';
import { SIGNUP_INPUTS } from '../constants/authorization';
import { notificationSelector } from '../store/notificationSlice';

const Registration: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading } = useAppSelector(notificationSelector);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('registrationPageText.title')}
        </Typography>
        <Loader isOpen={isLoading} />
        {!isLoading && (
        <AuthForm
          action={registration}
          fields={SIGNUP_INPUTS}
          buttonText={t('registrationPageText.title')}
        />
        )}
      </Box>
    </Container>
  );
};

export default Registration;
