import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@mui/material';
import AppRoutes from '../constants/routes';
import Section from './Home/Section';
import Title from './Home/Title';
import { ReactComponent as PmaSvg } from '../assets/pma.svg';
import muiTheme from '../constants/muiTheme';

const MainBannerContent: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <PmaSvg />
      <Title variant="h4">{t('welcomePage.title')}</Title>
      <Typography component="p" variant="h5">
        {t('welcomePage.desc')}
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained" size="large" onClick={() => navigate(AppRoutes.LOGIN)}>
            {t('AuthText.LOG_IN')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" onClick={() => navigate(AppRoutes.REGISTRATION)}>
            {t('AuthText.SIGN_UP')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const CustomizedMainBanner = styled('div')`
  display: grid;
  grid-template-columns: 25% 75%;

  gap: 15px;

  svg {
    fill: ${muiTheme.palette.primary.main};
    width: 100%;
    height: auto;
    grid-row: 1/4;
    grid-column: 1/2;
  }
`;

const MainBanner: React.FC = () => (
  <Section>
    <CustomizedMainBanner>
      <MainBannerContent />
    </CustomizedMainBanner>
  </Section>
);

export default MainBanner;
