import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import muiTheme from '../constants/muiTheme';

const CustomizedLink = styled(Link)`
  color: ${muiTheme.palette.primary.contrastText};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  transition: color 0.3s;

  :hover {
    color: ${muiTheme.palette.action.active};
  }
`;

export default CustomizedLink;
