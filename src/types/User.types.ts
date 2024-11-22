/* User Types */

import { Timestamp } from "firebase/firestore";

export type UserInfo = {
  avatar: number;
  createdAt: Timestamp;
  email: string;
  uid: string;
  updatedAt: Timestamp;
};

export type SignupDetails = {
  email: string;
  password: string;
  confirmPassword: string;
  avatarId: number;
};

export type UpdateUserDetails = SignupDetails & {
  currentPassword: string; // Add current password as a required field
};
