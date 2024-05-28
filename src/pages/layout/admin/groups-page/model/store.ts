import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { groupModel, Group } from 'entities/group';

export const Gate = createGate();

const domain = createDomain('pages/admin/group');

export const getGroupsFx = attach({ effect: groupModel.getGroupsFx });

export const $groups = domain.store<Group[] | null>(null);

$groups.on(getGroupsFx.doneData, (_, groups) => groups);

sample({
  clock: Gate.open,
  target: getGroupsFx,
});

sample({
  clock: groupModel.deleteGroupFx.done,
  target: getGroupsFx,
});
