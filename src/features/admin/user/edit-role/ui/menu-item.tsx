import React from 'react';

import { ListItemIcon, ListItemText, MenuItem } from 'shared/ui/kit';
import { EditRoundedIcon } from 'shared/ui/icons';

import { model } from '../model';

export const AdminEditUserRoleMenuItem: React.FC<{
  id: string;
}> = ({ id }) => {
  return (
    <MenuItem
      sx={{ padding: '2px 15px', '& .MuiListItemIcon-root': { minWidth: 32 } }}
      onClick={() => model.editUserRoleRequested(id)}
    >
      <ListItemIcon sx={{ m: 0 }}>
        <EditRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Edit role" />
    </MenuItem>
  );
};
