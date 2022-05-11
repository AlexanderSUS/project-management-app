import React from 'react';
import { AppBar, Grid } from '@mui/material';
import team from '../constants/teammate';
import RSSchcoolLogo from '../assets/rs-school-js.svg';
import TeammateLink from './TeammateLink';
import COPYRIGHT from '../constants/copyright';
import GridFlexGrow from './GridFlexGrow';

function Footer(): JSX.Element {
  return (
    <AppBar position="static" sx={{ padding: '15px' }} component="footer">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <RSSchcoolLogo />
        </Grid>
        <GridFlexGrow item>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {team.map((item) => (
              <Grid item key={item.id}>
                <TeammateLink {...item} />
              </Grid>
            ))}
          </Grid>
        </GridFlexGrow>
        <Grid item>{COPYRIGHT}</Grid>
      </Grid>
    </AppBar>
  );
}

export default Footer;
