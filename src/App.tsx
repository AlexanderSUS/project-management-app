import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter/AppRouter';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
