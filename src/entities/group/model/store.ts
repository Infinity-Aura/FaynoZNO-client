import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import { createGroup, deleteGroup, getGroup, getGroups, getMyGroups } from './api';

const domain = createDomain('entities/group');

export const getGroupsFx = domain.effect(getGroups);
export const getGroupFx = domain.effect(getGroup);
export const getMyGroupFx = domain.effect(getMyGroups);
export const createGroupFx = domain.effect(createGroup);
export const deleteGroupFx = domain.effect(deleteGroup);

showFxErrors([
  getGroupsFx.failData,
  getGroupFx.failData,
  getMyGroupFx.failData,
  createGroupFx.failData,
  deleteGroupFx.failData,
]);
