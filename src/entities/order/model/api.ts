import { http } from 'shared/config';

import { Order, UserOrder } from './types';
import { buildOrders, buildUserOrders } from '../api/builders';

export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  let response;
  try {
    response = await http.post(`/order`, order);
  } catch (error) {
    throw new Error(`Failed to create order: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const deleteOrder = async (orderId: string): Promise<Order> => {
  let response;
  try {
    response = await http.delete(`/order/${orderId}`);
  } catch (error) {
    throw new Error(`Failed to delete order: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const updateStatusOrder = async ({
  order,
  status,
}: {
  order: Order;
  status: string;
}): Promise<Order> => {
  let response;
  try {
    response = await http.patch(`/order/${order.id}/status`, {
      userId: order.userId,
      courseId: order.courseId,
      status,
    });
  } catch (error) {
    throw new Error(`Failed to update status order: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getOrder = async (orderId: string): Promise<Order> => {
  let response;
  try {
    response = await http.get(`/order/${orderId}`);
  } catch (error) {
    throw new Error(`Failed to get order: ${error}`);
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getOrders = async (): Promise<Order[]> => {
  let response;
  try {
    response = await http.get('/order');
  } catch (error) {
    throw new Error(`Failed to get orders: ${error}`);
  }

  let orders;
  try {
    orders = buildOrders(response.data);
  } catch (error) {
    throw new Error(`Failed to build orders: ${error}`);
  }

  return orders;
};

export const getOrderByUser = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}): Promise<Order | null> => {
  let response;
  try {
    response = await http.get(`/order/user/${userId}/course/${courseId}`);
  } catch (error) {
    throw new Error(`Failed to get order by user: ${error}`);
  }

  if (!response.data) {
    return null;
  }

  return {
    id: response.data._id,
    ...response.data,
  };
};

export const getUsersOrders = async (): Promise<UserOrder[]> => {
  let response;
  try {
    response = await http.get(`/order/users/all`);
  } catch (error) {
    throw new Error(`Failed to get users orders: ${error}`);
  }

  let orders;
  try {
    orders = buildUserOrders(response.data);
  } catch (error) {
    throw new Error(`Failed to build orders: ${error}`);
  }
  console.log(response);
  console.log(orders);

  return orders;
};
