import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../app/constants/routes';
import { navText } from '../../app/constants/text';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { authSelector } from '../../store/authSlice';
import AuthButtonsContainer from '../AuthButtonsContainer/AuthButtonsContainer';

const Header: React.FC = () => {
  const { isAuth } = useAppSelector(authSelector);

  return (
    <header>
      <Link to={AppRoutes.WELCOME}>{navText.home}</Link>
      {isAuth && <Link to={AppRoutes.PROJECTS}>{navText.projects}</Link>}
      <AuthButtonsContainer isAuth={isAuth} />
    </header>

  );
};

export default Header;
