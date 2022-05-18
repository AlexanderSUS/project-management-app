import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CelebrationSharpIcon from '@mui/icons-material/CelebrationSharp';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import { welcomePageEn } from '../constants/text';
import AppRoutes from '../constants/routes';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main>
      <Typography component="h1" variant="h3">
        {t('welcomePage.title')}
      </Typography>
      <Typography component="h2" variant="h4">
        {t('welcomePage.desc')}
      </Typography>
      <CelebrationSharpIcon color="primary" />
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate(AppRoutes.LOGIN)}>{t('AuthText.LOG_IN')}</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => navigate(AppRoutes.REGISTRATION)}>{t('AuthText.SIGN_UP')}</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {welcomePageEn.advantages.map((item, index) => (
          <Grid item xs={4} key={item}>
            <HomeRepairServiceSharpIcon color="primary" />
            <Typography component="h3" variant="h4">
              {t(`welcomePage.advantages.${index}`)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Welcome;
