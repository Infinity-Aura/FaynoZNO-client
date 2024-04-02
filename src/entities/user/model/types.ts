export type UserResponse = User & { _id: string };

export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export type User = {
  id: string;
  firstName: string;
  secondName: string;
  birth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  photo: string;
  role: Role;
};
