import React, { useEffect } from 'react';
import {
  Box, Stack, Typography,
} from '@mui/material';
import { Outlet, useMatch } from 'react-router-dom';
import { boardPage } from '../constants/text';
import Board from '../components/Board';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { boardSelector, getBoards } from '../store/boardSlice';
import Loader from '../components/Loader';
import AppRoutes from '../constants/routes';
import { authSelector } from '../store/authSlice';

function Projects(): JSX.Element {
  const { boards } = useAppSelector(boardSelector);
  const { isLoading, error } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const content = useMatch(AppRoutes.PROJECTS) ? (
    <>
      <Typography component="h1" variant="h3">
        {boardPage.title}
      </Typography>
      {isLoading && <Loader />}
      {!isLoading && error && <span>{error}</span>}
      {!isLoading && !error && !boards.length && <Box>{boardPage.noBoards}</Box>}
      {!isLoading && !error && !!boards.length && (
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {boards.map((board) => (
            <Board board={board} key={board.id} />
          ))}
        </Stack>
      </Box>
      )}
    </>
  ) : <Outlet />;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex', flexDirection: 'column', gap: '1rem', p: '2rem',
      }}
    >
      {content}
    </Box>
  );
}

export default Projects;
