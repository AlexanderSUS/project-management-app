import {
  AppBar, Container, Grid, Slide, useScrollTrigger,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { authSelector, getUserData } from '../store/authSlice';
import { openModal } from '../store/modalSlice';
import AuthButtonsContainer from './AuthButtonsContainer';
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

  return (
    <HideOnScroll>
      <AppBar position="sticky" sx={{ padding: '15px 0' }}>
        <Container>
          <Grid container spacing={1}>
            <Grid item>
              <HeaderButton
                text={t('navText.home')}
                Icon={HomeIcon}
                onClick={() => navigate(AppRoutes.WELCOME)}
              />
            </Grid>
            {userId && (
              <Grid item sx={{ margin: '0 auto' }}>
                <HeaderButton
                  text={t('navText.projects')}
                  Icon={DashboardIcon}
                  onClick={() => navigate(AppRoutes.PROJECTS)}
                />
                <HeaderButton
                  text={t('navText.newBoard')}
                  Icon={DashboardCustomizeIcon}
                  onClick={() => {
                    dispatch(openModal(NEW_BOARD));
                  }}
                />
                <HeaderButton
                  text={t('navText.editProfile')}
                  Icon={PersonIcon}
                  onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
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
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
