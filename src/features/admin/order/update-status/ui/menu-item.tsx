import React from 'react';

import { UserOrder } from 'entities/order';

import { ListItemIcon, ListItemText, MenuItem } from 'shared/ui/kit';
import { CheckCircleRoundedIcon, DoDisturbOnRoundedIcon } from 'shared/ui/icons';

import { model } from '../model';

const statusDict: Record<string, React.ReactNode> = {
  Approved: (
    <>
      <ListItemIcon sx={{ m: 0 }}>
        <CheckCircleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Approve" />
    </>
  ),
  Denied: (
    <>
      <ListItemIcon sx={{ m: 0 }}>
        <DoDisturbOnRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Deny" />
    </>
  ),
};

export const AdminUpdateStatusOrderMenuItem: React.FC<{
  order: UserOrder;
  status: string;
}> = ({ order, status }) => {
  return (
    <MenuItem
      sx={{ padding: '2px 15px', '& .MuiListItemIcon-root': { minWidth: 32 } }}
      onClick={() => model.updateStatusOrderRequested({ order, status })}
    >
      {statusDict[status]}
    </MenuItem>
  );
};
