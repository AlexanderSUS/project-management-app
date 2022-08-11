import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import muiTheme from './constants/muiTheme';
import AppRouter from './components/AppRouter';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
