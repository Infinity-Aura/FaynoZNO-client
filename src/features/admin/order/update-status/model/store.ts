import { attach, createDomain, sample } from 'effector';

import { UserOrder, orderModel } from 'entities/order';

const domain = createDomain('features/admin/order/delete');

export const updateStatusOrderRequested = domain.event<{
  order: UserOrder;
  status: string;
}>();

const updateStatusOrderFx = attach({ effect: orderModel.updateStatusOrderFx });

sample({
  clock: updateStatusOrderRequested,
  target: updateStatusOrderFx,
});
