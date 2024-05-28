import { attach, createDomain, sample } from 'effector';

import { groupModel } from 'entities/group';

const domain = createDomain('features/admin/group/delete');

export const deleteGroupRequested = domain.event<string>();

const deleteGroupFx = attach({ effect: groupModel.deleteGroupFx });

sample({
  clock: deleteGroupRequested,
  target: deleteGroupFx,
});
