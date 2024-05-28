import { Order, OrderResponse, UserOrder, UserOrderResponse } from '../model/types';

export const buildOrders = (orders: OrderResponse[]): Order[] =>
  orders.map((order) => ({
    ...order,
    id: order.id,
  }));

export const buildUserOrders = (orders: UserOrderResponse[]): UserOrder[] =>
  orders.map((order) => ({
    ...order,
    id: order.id,
  }));
