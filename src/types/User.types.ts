/* User Types */

import { Timestamp } from "firebase/firestore";

export type UserInfo = {
  avatar: number;
  createdAt: Timestamp;
  email: string;
  uid: string;
  updatedAt: Timestamp;
};
