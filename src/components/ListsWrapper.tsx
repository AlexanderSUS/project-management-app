import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { boardPage } from '../constants/text';
import List from './List';
import { sortColumns } from '../helpers/sortItems';
import { columnSelector } from '../store/columnSlice';
import scrollStyles from '../constants/scrollStyles';

const StyledListWrapper = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-right: -1rem;
  gap: 1rem;
  overflow-x: auto;
  ${scrollStyles}
`;

const ListsWrapper: React.FC = () => {
  const { columns } = useAppSelector(columnSelector);

  return columns.length ? (
    <StyledListWrapper>
      {sortColumns(columns).map((column) => (
        <List key={column.id} column={column} />
      ))}
    </StyledListWrapper>
  ) : (
    <Typography variant="h6">{boardPage.noLists}</Typography>
  );
};

export default ListsWrapper;
