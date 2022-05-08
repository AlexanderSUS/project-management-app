import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../app/constants/routes';
import { navText } from '../../app/constants/text';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { authSelector } from '../../store/authSlice';
import AuthButtonsContainer from '../AuthButtonsContainer/AuthButtonsContainer';

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);

  return (
    <header>
      <Link to={AppRoutes.WELCOME}>{navText.home}</Link>
      {userId && <Link to={AppRoutes.PROJECTS}>{navText.projects}</Link>}
      <AuthButtonsContainer userId={userId} />
    </header>

  );
};

export default Header;
