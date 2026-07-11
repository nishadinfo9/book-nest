export type Role = "CUSTOMER" | "ADMIN" | "SELLER";

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string | null;
  externalId: string | null;
  image: string | null;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUserType {
  name: string;
  email: string;
  password: string
  confirmPassword: string
}

export interface LoggedInUserType {
  email: string;
  password: string

}
