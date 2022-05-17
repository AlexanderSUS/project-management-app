import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { columnSelector } from '../store/columnSlice';
import { boardPage } from '../constants/text';
import List from './List';
import Loader from './Loader';

const StyledListWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
`;

const ListsWrapper: React.FC = () => {
  const { pending, columns, error } = useAppSelector(columnSelector, shallowEqual);

  const sortedColumns = columns.length > 1
    ? [...columns].sort((a, b) => (a.order - b.order)) : columns;

  return (
    <StyledListWrapper>
      { pending && <Loader /> }
      {!pending && error && <Typography>{error}</Typography>}
      {!pending && !error && !columns.length && <Typography variant="h6">{boardPage.noLists}</Typography>}
      {!pending && !error && columns.length ? (
        <>
          { sortedColumns.map((column) => (
            <List key={column.id} column={column} />))}
        </>
      ) : null}
    </StyledListWrapper>
  );
};

export default ListsWrapper;
