import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserData } from '../types/user';

const ITEM_HEIGHT = 48;

type Props = {
  userId: string;
  users: UserData[];
  reasignUser: (id: string) => void;
};

const UserSelect: React.FC<Props> = ({ users, userId, reasignUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id: string) => {
    setAnchorEl(null);
    if (id) {
      reasignUser(id);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose('')}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {users.map((user) => (
          <MenuItem
            key={user.id}
            selected={user.id === userId}
            onClick={() => handleClose(user.id)}
          >
            {`${user.name} (${user.login})`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default UserSelect;
