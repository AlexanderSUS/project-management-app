import { createTheme } from '@mui/material';

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1680,
    },
  },
  palette: {
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
    },
    primary: {
      contrastText: '#fff',
      dark: '#0059B2',
      light: '#66B2FF',
      main: '#007FFF',
    },
    secondary: {
      contrastText: '#fff',
      dark: '#7b1fa2',
      light: '#ba68c8',
      main: '#9c27b0',
    },
    text: {
      disabled: 'rgba(0, 0, 0, 0.38)',
      primary: '#1A2027',
      secondary: '#3E5060',
    },
    error: {
      contrastText: '#fff',
      dark: '#C70011',
      light: '#FF99A2',
      main: '#EB0014',
    },
  },
});

export default muiTheme;
