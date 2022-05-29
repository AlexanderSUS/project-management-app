import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useTranslation } from 'react-i18next';

type Props = {
  onClick: VoidFunction | ((e: React.MouseEvent<HTMLButtonElement>) => void) ;
};

const ShowCaseButton: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('boardPage.showDescription')}>
      <IconButton onClick={onClick}>
        <PageviewIcon fontSize="inherit" color="warning" />
      </IconButton>
    </Tooltip>

  );
};

export default ShowCaseButton;
