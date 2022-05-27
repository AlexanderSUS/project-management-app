import muiTheme from './muiTheme';

const { light, main } = muiTheme.palette.primary;
const scrollStyles = `
  ::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${light};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${main};
  }
`;

export default scrollStyles;
