import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { User, userModel } from 'entities/user';
import { Role } from 'entities/user';

export type RolesFilter = Role | 'all';

export const Gate = createGate();

const domain = createDomain('pages/admin/users');

export const rolesFilterChanged = domain.event<RolesFilter>();

export const getUsersFx = attach({ effect: userModel.getUsersFx });

export const $users = domain.store<User[] | null>(null);
export const $selectedRolesFilter = domain.store<RolesFilter>('all');

$selectedRolesFilter.on(rolesFilterChanged, (_, rolesFilter) => rolesFilter);

sample({
  clock: [Gate.open, $selectedRolesFilter, userModel.updateUserRoleFx.doneData],
  target: getUsersFx,
});

sample({
  clock: getUsersFx.doneData,
  source: $selectedRolesFilter,
  fn: (selectedRolesFilter, users) =>
    users.filter((user) => user.role === selectedRolesFilter || selectedRolesFilter === 'all'),
  target: $users,
});

sample({
  clock: userModel.deleteUserFx.done,
  target: getUsersFx,
});
