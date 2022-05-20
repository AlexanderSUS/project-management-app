import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import { technology, welcomePageEn } from '../constants/text';
import team from '../constants/teammate';
import RSSchoolLogo from '../components/RSSchoolLogo';
import MainBanner from '../components/MainBannerr';
import Advantage from '../components/Home/Advantage';
import Section from '../components/Home/Section';
import Title from '../components/Home/Title';
import Technology from '../components/Home/Technology';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Container>
        <MainBanner />
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
              <Grid item xs={6} sm={4} lg={3} key={item.id}>
                <Technology {...item} />
              </Grid>
            ))}
          </Grid>
        </Section>
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
