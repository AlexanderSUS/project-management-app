import { styled } from '@mui/material/styles';
import muiTheme from '../../constants/muiTheme';

const { lg, sm } = muiTheme.breakpoints.values;

const Section = styled('section')`
  padding: 50px 0;

  @media screen and (max-width: ${lg}px) {
    padding: 25px 0;
  }

  @media screen and (max-width: ${sm}px) {
    padding: 15px 0;
  }
`;

export default Section;
