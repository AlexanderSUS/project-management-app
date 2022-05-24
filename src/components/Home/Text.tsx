import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import muiTheme from '../../constants/muiTheme';

const { sm } = muiTheme.breakpoints.values;

const Text = styled(Typography)`
  margin-bottom: 25px;
  font-weight: bold;

  @media screen and (max-width: ${sm}px) {
    margin-bottom: 15px;
  }
`;

export default Text;
