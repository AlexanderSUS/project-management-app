import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../hooks/reduxTypedHooks';
import { columnSelector } from '../store/columnSlice';
import { notificationSelector } from '../store/notificationSlice';
import { boardPage } from '../constants/text';
import List from './List';
import Loader from './Loader';
import { taskSelector } from '../store/taskSlice';
import sortItems from '../helpers/sortItems';

const StyledListWrapper = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: scroll;
`;

const ListsWrapper: React.FC = () => {
  const { columns } = useAppSelector(columnSelector, shallowEqual);
  const { isLoading, error } = useAppSelector(notificationSelector);
  const { tasks } = useAppSelector(taskSelector);

  return (
    <StyledListWrapper>
      { isLoading && <Loader /> }
      {!isLoading && !error && !columns.length && <Typography variant="h6">{boardPage.noLists}</Typography>}
      {!isLoading && !error && columns.length ? (
        <>
          { sortItems(columns).map((column) => (
            <List
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.columnId === column.id)}
            />
          ))}
        </>
      ) : null}
    </StyledListWrapper>
  );
};

export default ListsWrapper;
