import React from 'react';
import { Button, Typography, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type HeaderButtonProps = {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  onClick?: () => void;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ text, Icon, onClick }) => (
  <Button color="inherit" onClick={onClick} startIcon={<Icon />} sx={{ minWidth: 'unset' }}>
    <Typography sx={{ display: { xs: 'none', sm: 'inline-block' } }}>{text}</Typography>
  </Button>
);

HeaderButton.defaultProps = { onClick: () => {} };

export default HeaderButton;
