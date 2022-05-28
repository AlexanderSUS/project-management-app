import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Grid } from '@mui/material';
import team from '../constants/teammate';
import RSSchoolLogo from './RSSchoolLogo';
import TeammateLink from './TeammateLink';
import COPYRIGHT from '../constants/copyright';
import GridFlexGrow from './GridFlexGrow';
import muiTheme from '../constants/muiTheme';

const { sm } = muiTheme.breakpoints.values;

const Logo = styled(Grid)`
  @media screen and (max-width: ${sm}px) {
    width: 75px;
    order: 1;
  }
`;

const Links = styled(GridFlexGrow)`
  @media screen and (max-width: ${sm}px) {
    order: 3;

    .MuiGrid-container {
      justify-content: space-between;
    }
  }
`;

const Copyright = styled(Grid)`
  @media screen and (max-width: ${sm}px) {
    order: 2;
  }
`;

function Footer(): JSX.Element {
  return (
    <AppBar position="static" sx={{ padding: '15px', mt: 'auto' }} component="footer">
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Logo item>
          <RSSchoolLogo />
        </Logo>
        <Links item>
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            {team.map((item) => (
              <Grid item key={item.id}>
                <TeammateLink {...item} />
              </Grid>
            ))}
          </Grid>
        </Links>
        <Copyright item>{COPYRIGHT}</Copyright>
      </Grid>
    </AppBar>
  );
}

export default Footer;
