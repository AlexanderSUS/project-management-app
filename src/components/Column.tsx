import { Box, Typography } from '@mui/material';
import React from 'react';

const Column = () => {
  const tasks = [
    { id: 1, titie: 'Task 1', order: 3 },
    { id: 2, title: 'task 2', order: 4 },
    { id: 3, title: 'task 3', order: 1 },
    { id: 4, title: 'task 4', order: 5 },
    { id: 5, title: 'task 5', order: 2 },
    { id: 6, title: 'task 6', order: 5 },
  ];

  return (
    <div>
      {tasks.sort((a, b) => (a.order - b.order)).map((task) => (
        <Box key={task.id}>
          <Typography variant="h6">{task.title}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default Column;
