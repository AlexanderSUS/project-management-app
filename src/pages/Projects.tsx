import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { Outlet, useMatch } from 'react-router-dom';
import { boardPage } from '../constants/text';
import BoardPreviewsWrapper from '../components/BoardPreviewsWrapper';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTypedHooks';
import { boardSelector, getBoards } from '../store/boardSlice';
import Loader from '../components/Loader';
import AppRoutes from '../constants/routes';
import { notificationSelector } from '../store/notificationSlice';

const StyledMain = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  padding: 2rem 0;
`;

function Projects(): JSX.Element {
  const dispatch = useAppDispatch();
  const { boardsPreview } = useAppSelector(boardSelector);
  const { isLoading } = useAppSelector(notificationSelector);

  useEffect(() => {
    // TODO add rerender when user return from board page
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <StyledMain component="main">
      {useMatch(AppRoutes.PROJECTS) ? (
        <Container>
          <Typography component="h1" variant="h3">
            {boardPage.title}
          </Typography>
          {isLoading && <Loader />}
          {!isLoading && <BoardPreviewsWrapper boardsPreview={boardsPreview} />}
        </Container>
      ) : (
        <Outlet />
      )}
    </StyledMain>
  );
}

export default Projects;
