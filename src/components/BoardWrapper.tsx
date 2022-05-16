import React from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { boardPage } from '../constants/text';

const BoardWrapper = () => {
  const location = useLocation();
  const boardId = location.pathname.slice(8);
  console.log(boardId);

  return (
    <>
      <h1>BoardWrapper</h1>
      <Button>
        {boardPage.addColunm}
      </Button>
    </>

  );
};

export default BoardWrapper;
