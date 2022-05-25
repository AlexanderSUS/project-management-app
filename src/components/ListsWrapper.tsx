import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { boardPage } from '../constants/text';
import List from './List';
import { sortColumns } from '../helpers/sortItems';
import { columnSelector } from '../store/columnSlice';

const StyledListWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
`;

const ListsWrapper: React.FC = () => {
  const { columns } = useAppSelector(columnSelector);

  return (columns.length
    ? (
      <StyledListWrapper>
        {sortColumns(columns).map((column) => (<List key={column.id} column={column} />))}
      </StyledListWrapper>
    )
    : <Typography variant="h6">{boardPage.noLists}</Typography>);
};

export default ListsWrapper;
