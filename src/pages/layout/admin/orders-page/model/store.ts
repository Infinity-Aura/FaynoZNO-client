import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { UserOrder, orderModel } from 'entities/order';

export const Gate = createGate();

const domain = createDomain('pages/order');

export const getUsersOrdersFx = attach({ effect: orderModel.getUsersOrdersFx });

export const $orders = domain.store<UserOrder[] | null>(null);

$orders.on(getUsersOrdersFx.doneData, (_, orders) => orders);

sample({
  clock: Gate.open,
  target: getUsersOrdersFx,
});

sample({
  clock: [orderModel.updateStatusOrderFx.done, orderModel.deleteOrderFx.done],
  target: getUsersOrdersFx,
});
