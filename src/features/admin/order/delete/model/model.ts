import { attach, createDomain, sample } from 'effector';
import { orderModel } from 'entities/order';

const domain = createDomain('features/admin/order/delete');

export const deleteOrderRequested = domain.event<string>();

const deleteOrderFx = attach({ effect: orderModel.deleteOrderFx });

sample({
  clock: deleteOrderRequested,
  target: deleteOrderFx,
});
