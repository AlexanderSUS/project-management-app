import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { boardPage } from '../constants/text';
import List from './List';
import { sortColumns } from '../helpers/sortItems';
import { boardSelector } from '../store/boardSlice';

const StyledListWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
`;

const ListsWrapper: React.FC = () => {
  const { board } = useAppSelector(boardSelector);
  const columns = board?.columns;

  if (columns && !columns.length) {
    return <Typography variant="h6">{boardPage.noLists}</Typography>;
  }

  if (columns && columns.length) {
    return (
      <StyledListWrapper>
        { sortColumns(columns).map((column) => (
          <List
            key={column.id}
            column={column}
            tasks={column.tasks}
          />
        ))}
      </StyledListWrapper>

    );
  }

  return null;
};

export default ListsWrapper;
