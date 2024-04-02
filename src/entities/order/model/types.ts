export type OrderResponse = Order & { _id: string };

export type Order = {
  id: string;
  userId: string;
  courseId: string;
  date: string;
  status: string;
};

export type UserOrderResponse = UserOrder & { _id: string };

export type UserOrder = Order & {
  userFirstName: string;
  userSecondName: string;
  userEmail: string;
  courseName: string;
};

// type OrderStatus = 'Approved' | 'Pending' | 'Denied';
