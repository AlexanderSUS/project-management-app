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

function Projects(): JSX.Element {
  const { boards, error, pending } = useAppSelector(boardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const content = useMatch(AppRoutes.PROJECTS) ? (
    <>
      <Typography component="h1" variant="h3">
        {boardPage.title}
      </Typography>
      {pending && <Loader />}
      {!pending && error && <span>{error}</span>}
      {!pending && !error && !boards.length && <Box>{boardPage.noBoards}</Box>}
      {!pending && !error && !!boards.length && (
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
