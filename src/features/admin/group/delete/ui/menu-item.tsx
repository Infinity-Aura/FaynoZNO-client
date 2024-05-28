import React from 'react';

import { ListItemIcon, ListItemText, MenuItem } from 'shared/ui/kit';
import { DeleteIcon } from 'shared/ui/icons';

import { model } from '../model';

export const AdminGroupDeleteMenuItem: React.FC<{
  id: string;
}> = ({ id }) => {
  return (
    <MenuItem
      sx={{ padding: '2px 15px', '& .MuiListItemIcon-root': { minWidth: 32 } }}
      onClick={() => model.deleteGroupRequested(id)}
    >
      <ListItemIcon sx={{ m: 0 }}>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  );
};
