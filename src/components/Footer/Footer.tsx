/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppBar, Grid } from '@mui/material';
import team from '../../app/constants/teammate';
import RSSchcoolLogo from '../RSSchcoolLogo/RSSchcoolLogo';
import TeammateLink from '../TeammateLink/TeammateLink';
import COPYRIGHT from '../../app/constants/copyright';
import GridFlexGrow from '../GridFlexGrow/GridFlexGrow';

function Footer(): JSX.Element {
  return (
    <AppBar position="static" sx={{ padding: '15px' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <RSSchcoolLogo />
        </Grid>
        <GridFlexGrow>
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
