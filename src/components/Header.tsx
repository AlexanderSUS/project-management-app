import { AppBar, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../constants/routes';
import { navText } from '../constants/text';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { authSelector } from '../store/authSlice';
import { modalSelector, openModal } from '../store/modalSlice';
import AuthButtonsContainer from './AuthButtonsContainer';
import GridFlexGrow from './GridFlexGrow';
import HeaderButton from './HeaderButton';
import LangSwitcher from './LangSwitcher';
import BasicModal from './BasicModal';
import { NEW_BOARD } from '../constants/modal';

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);
  const { isOpen } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ padding: '15px' }}>
      <Grid container spacing={2}>
        <GridFlexGrow item>
          <HeaderButton onClick={() => navigate(AppRoutes.WELCOME)} text={navText.home} />
        </GridFlexGrow>
        {userId && (
          <Grid item>
            <HeaderButton onClick={() => navigate(AppRoutes.PROJECTS)} text={navText.projects} />
            <HeaderButton
              onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
              text={navText.editProfile}
            />
            <HeaderButton
              text={navText.newBoard}
              onClick={() => { dispatch(openModal({ content: NEW_BOARD, action: 'addBoard' })); }}
            />
          </Grid>
        )}
        <Grid item>
          <LangSwitcher />
        </Grid>
        <Grid item>
          <AuthButtonsContainer userId={userId} />
        </Grid>
      </Grid>
      {isOpen && <BasicModal />}
    </AppBar>
  );
};

export default Header;
