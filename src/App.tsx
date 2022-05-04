import React from 'react';
import { NavLink } from 'react-router-dom';
import AppRoutes from './app/constants/routes';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
    <div className="app-wrapper">
      {/* Navigation menu just for example. It will move to header */}
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <NavLink to={AppRoutes.WELCOME}>Welcome</NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink to={AppRoutes.AUTH}>Auth</NavLink>
        </li>
        <li className="nav-menu__item">
          <NavLink to={AppRoutes.PROJECTS}>Projects</NavLink>
        </li>
      </ul>
      <AppRouter />
    </div>
  );
}

export default App;
