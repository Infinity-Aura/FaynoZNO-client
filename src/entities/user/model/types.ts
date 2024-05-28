export type UserResponse = User & { _id: string };

export type User = {
  id: string;
  firstName: string;
  secondName: string;
  birth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  photo: string;
  role: string;
};
