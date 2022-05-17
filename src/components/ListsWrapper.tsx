import { Typography } from '@mui/material';
import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { columnSelector } from '../store/columnSlice';
import { boardPage } from '../constants/text';
import List from './List';
import Loader from './Loader';

const ListsWrapper: React.FC = () => {
  const { pending, columns, error } = useAppSelector(columnSelector, shallowEqual);

  return (
    <>
      { pending && <Loader /> }
      {!pending && error && <Typography>{error}</Typography>}
      {!pending && !error && !columns.length && <Typography variant="h6">{boardPage.noLists}</Typography>}
      {!pending && !error && columns.length ? columns.map((column) => (
        <List key={column.id} column={column} />)) : null}
    </>
  );
};

export default ListsWrapper;
