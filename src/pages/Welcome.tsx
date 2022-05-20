import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { technology, welcomePageEn } from '../constants/text';
import team from '../constants/teammate';
import RSSchoolLogo from '../components/RSSchoolLogo';
import MainBanner from '../components/MainBannerr';
import Advantage from '../components/Home/Advantage';
import Section from '../components/Home/Section';
import Title from '../components/Home/Title';
import Technology from '../components/Home/Technology';
import Teammate from '../components/Home/Teammate';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <Section>
          <MainBanner />
        </Section>
        <Section>
          <Grid container spacing={2} justifyContent="center">
            {welcomePageEn.advantages.map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={item}>
                <Advantage index={index} />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section>
          <Title variant="h4" textAlign="center">
            {t('welcomePage.technology')}
          </Title>
          <Grid container spacing={2} justifyContent="center">
            {technology.map((item) => (
              <Grid item xs={6} sm={3} lg={2} key={item.id}>
                <Technology {...item} />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section>
          <Title variant="h4" textAlign="center">
            {t('welcomePage.app')}
          </Title>
          <Typography component="p" variant="h5">
            {t('welcomePage.school')}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} sx={{ margin: '50px 0', display: 'flex', justifyContent: 'center' }}>
              <RSSchoolLogo />
            </Grid>
          </Grid>
          <Title variant="h4" textAlign="center">
            {t('welcomePage.team')}
          </Title>
          <Grid container spacing={2} justifyContent="center">
            {team.map((item) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <Teammate {...item} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Container>
    </main>
  );
};

export default Welcome;
