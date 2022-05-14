import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { boardPage } from '../constants/text';
import Board from '../components/Board';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { boardSelector, getBoards } from '../store/boardSlice';
import Loader from '../components/Loader';

function Projects(): JSX.Element {
  const { boards, error, pending } = useAppSelector(boardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO solve problem with void argument
    dispatch(getBoards(null));
  }, [dispatch]);

  return (
    <main>
      <Typography component="h1" variant="h3">
        {boardPage.title}
      </Typography>
      {pending && <Loader />}
      {!pending && error && <span>{error}</span>}
      {!pending && !error && !boards.length && <Box>{boardPage.noBoards}</Box>}
      {!pending && !error && !!boards.length && (
        <Box>
          {boards.map((board) => (
            <Board board={board} />
          ))}
        </Box>
      )}
    </main>
  );
}

export default Projects;
