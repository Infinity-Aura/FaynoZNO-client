import React from 'react';
import { useStore } from 'effector-react';

import { Box } from 'shared/ui/kit';

import { sessionModel } from 'entities/session';

import { model } from '../model';

export const AdminEditUserRoleDialog = () => {
  const user = useStore(sessionModel.$user);

  return <Box></Box>;
};
