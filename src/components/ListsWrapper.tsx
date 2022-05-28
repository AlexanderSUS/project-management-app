import React from 'react';
import {
  styled,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import List, { ColumnStyled } from './List';
import { sortColumns } from '../helpers/sortItems';
import { columnSelector } from '../store/columnSlice';
import scrollStyles from '../constants/scrollStyles';
import { openModal } from '../store/modalSlice';
import { ADD_COLUMN } from '../constants/formfields';

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
  const dispatch = useAppDispatch();
  const addColumn = () => {
    dispatch(openModal(ADD_COLUMN));
  };
  const { t } = useTranslation();

  return columns.length ? (
    <StyledListWrapper>
      {sortColumns(columns).map((column) => (
        <List key={column.id} column={column} />
      ))}
      <ColumnStyled sx={{ p: '0', background: 'none' }}>
        <Button variant="contained" onClick={addColumn} startIcon={<AddIcon />}>
          {t('navText.newList')}
        </Button>
      </ColumnStyled>
    </StyledListWrapper>
  ) : (
    <Typography variant="h6">{t('boardPage.noLists')}</Typography>
  );
};

export default ListsWrapper;
