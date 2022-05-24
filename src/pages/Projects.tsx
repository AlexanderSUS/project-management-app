import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet, useMatch } from 'react-router-dom';
import { boardPage } from '../constants/text';
import BoardPreviewsWrapper from '../components/BoardPreviewsWrapper';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { boardSelector, getBoards } from '../store/boardSlice';
import Loader from '../components/Loader';
import AppRoutes from '../constants/routes';
import { notificationSelector } from '../store/notificationSlice';
import { authSelector } from '../store/authSlice';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  p: '2rem',
};

function Projects(): JSX.Element {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector(boardSelector);
  const { userId } = useAppSelector(authSelector);
  const { isLoading } = useAppSelector(notificationSelector);

  useEffect(() => {
    if (userId) {
      dispatch(getBoards());
    }
  }, [dispatch, userId]);

  return (
    <Box component="main" sx={styles}>
      {useMatch(AppRoutes.PROJECTS) ? (
        <>
          <Typography component="h1" variant="h3">
            {boardPage.title}
          </Typography>
          {isLoading && <Loader />}
          {!isLoading && <BoardPreviewsWrapper boards={boards} />}
        </>
      ) : <Outlet />}
    </Box>
  );
}

export default Projects;
