import {
  AppBar, Grid, Slide, useScrollTrigger,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { authSelector, getUserData } from '../store/authSlice';
import { openModal } from '../store/modalSlice';
import AuthButtonsContainer from './AuthButtonsContainer';
import GridFlexGrow from './GridFlexGrow';
import HeaderButton from './HeaderButton';
import LangSwitcher from './LangSwitcher';
import BasicModal from './BasicModal';
import { NEW_BOARD } from '../constants/formfields';
import { TOKEN } from '../constants/authorization';
import { addBoardListener, addModalBoardPageActionListener } from '../store/middlewareListeners';
import { startBoardListening, startColumsAndTasksListening } from '../store/listenerMiddleware';

type HideOnScrollProps = {
  children: React.ReactElement;
};

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header: React.FC = () => {
  const { userId } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const jwt = localStorage.getItem(TOKEN);
    if (jwt) {
      dispatch(getUserData(jwt));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      navigate(AppRoutes.PROJECTS);
    } else {
      navigate(AppRoutes.WELCOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    addBoardListener(startBoardListening);
    addModalBoardPageActionListener(startColumsAndTasksListening);
  }, []);

  useEffect(() => {}, []);
  return (
    <HideOnScroll>
      <AppBar position="sticky" sx={{ padding: '15px' }}>
        <Grid container spacing={2}>
          <GridFlexGrow item>
            <HeaderButton onClick={() => navigate(AppRoutes.WELCOME)} text={t('navText.home')} />
          </GridFlexGrow>
          {userId && (
            <Grid item>
              <HeaderButton
                onClick={() => navigate(AppRoutes.PROJECTS)}
                text={t('navText.projects')}
              />
              <HeaderButton
                onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
                text={t('navText.editProfile')}
              />
              <HeaderButton
                text={t('navText.newBoard')}
                onClick={() => {
                  dispatch(openModal(NEW_BOARD));
                }}
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
        <BasicModal />
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
