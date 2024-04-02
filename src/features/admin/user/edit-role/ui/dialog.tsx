import React from 'react';
import { useStore } from 'effector-react';

import { Role } from 'entities/user';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from 'shared/ui/kit';

import * as model from '../model';

export const AdminEditUserRoleDialog = () => {
  const user = useStore(model.$selectedUser);
  const openDialog = useStore(model.$openDialog);

  const [role, setRole] = React.useState<Role | null>(null);

  React.useEffect(() => {
    user?.role && setRole(user.role);
  }, [user?.role]);

  return (
    <Dialog open={openDialog} onClose={() => model.closeDialogRequested()}>
      <DialogTitle>Select role</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            value={role ?? ''}
            defaultValue={user?.role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            <MenuItem value={Role.Admin}>{Role.Admin}</MenuItem>
            <MenuItem value={Role.Teacher}>{Role.Teacher}</MenuItem>
            <MenuItem value={Role.Student}>{Role.Student}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.closeDialogRequested()}>Disagree</Button>
        <Button
          variant="contained"
          disabled={!role || role === user?.role}
          onClick={() => role && model.saveUserRoleRequested(role)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
