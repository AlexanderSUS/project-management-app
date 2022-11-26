import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import BoardPreviewsWrapper from '../components/BoardPreviewsWrapper';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { boardSelector, getBoards } from '../store/boardSlice';
import Loader from '../components/Loader';
import AppRoutes from '../constants/routes';
import { notificationSelector } from '../store/notificationSlice';
import muiTheme from '../constants/muiTheme';
import useWindowWidth from '../hooks/useWindowWidth';
import { break700 } from '../constants/styles';

const projectPageStyle = {
  bgcolor: muiTheme.palette.primary.light,
  flex: '1',
  pb: '1rem',
};

const projectsTitleStyle = {
  margin: '1rem 0',
  fontWeight: '500',
  overflowWrap: 'break-word',
};

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { boardsPreview } = useAppSelector(boardSelector);
  const { isLoading } = useAppSelector(notificationSelector);
  const { t } = useTranslation();
  const width = useWindowWidth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === AppRoutes.PROJECTS) {
      dispatch(getBoards());
    }
  }, [dispatch, location.pathname]);

  return useMatch(AppRoutes.PROJECTS) ? (
    <Box sx={projectPageStyle}>
      <Container component="main">
        <Loader isOpen={isLoading} />
        <Typography
          component="h1"
          variant={width > break700 ? 'h1' : 'h4'}
          color="white"
          align="center"
          sx={projectsTitleStyle}
        >
          {t('boardPage.title')}
        </Typography>
        <BoardPreviewsWrapper boardsPreview={boardsPreview} />
      </Container>
    </Box>
  ) : (
    <Outlet />
  );
};

export default Projects;
