import muiTheme from './muiTheme';

const { light, main } = muiTheme.palette.warning;
const scrollStyles = {
  '::-webkit-scrollbar': {
    width: '0.25rem',
    height: '0.25rem',
  },
  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '2px',
    background: `${light}`,
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: `${main}`,
  },
};

export default scrollStyles;
