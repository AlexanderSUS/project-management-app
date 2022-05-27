import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  langButton, langMenuItem, LANG_EN, LANG_RU,
} from '../constants/text';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>(
    i18n.resolvedLanguage === LANG_RU ? langButton.ru : langButton.en,
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseEn = () => {
    setAnchorEl(null);
    setLang(langMenuItem.en);
    i18n.changeLanguage(LANG_EN);
  };

  const handleCloseRu = () => {
    setAnchorEl(null);
    setLang(langMenuItem.ru);
    i18n.changeLanguage(LANG_RU);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        onClick={handleClick}
      >
        {lang}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseEn}>{langMenuItem.en}</MenuItem>
        <MenuItem onClick={handleCloseRu}>{langMenuItem.ru}</MenuItem>
      </Menu>
    </div>
  );
};

export default LangSwitcher;
