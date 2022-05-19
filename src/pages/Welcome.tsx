import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Container } from '@mui/material';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import CelebrationSharpIcon from '@mui/icons-material/CelebrationSharp';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import { technology, welcomePageEn } from '../constants/text';
import AppRoutes from '../constants/routes';
import team from '../constants/teammate';
import RSSchoolLogo from '../components/RSSchoolLogo';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <Typography component="h1" variant="h4">
          {t('welcomePage.title')}
        </Typography>
        <Typography component="h2" variant="h4">
          {t('welcomePage.desc')}
        </Typography>
        <CelebrationSharpIcon color="primary" />
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={() => navigate(AppRoutes.LOGIN)}>
              {t('AuthText.LOG_IN')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => navigate(AppRoutes.REGISTRATION)}>
              {t('AuthText.SIGN_UP')}
            </Button>
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
        <Typography component="h3" variant="h4">
          {t('welcomePage.technology')}
        </Typography>
        {technology.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Link href={item.link} target="_blank">
              <img src={item.icon} alt={item.name} />
              <Typography component="h3" variant="h5">
                {item.name}
              </Typography>
            </Link>
          </Grid>
        ))}
        <Typography component="h3" variant="h4">
          {t('welcomePage.app')}
        </Typography>
        <Typography component="p" variant="h5">
          {t('welcomePage.school')}
        </Typography>
        <RSSchoolLogo />
        <Typography component="h3" variant="h4">
          {t('welcomePage.team')}
        </Typography>
        {team.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Link href={item.href} target="_blank">
              <GroupsSharpIcon />
              <Typography component="h3" variant="h5">
                {item.login}
              </Typography>
              <Typography component="h3" variant="h6">
                {item.role}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Container>
    </main>
  );
};

export default Welcome;
