/* Schedule Types */

import { Timestamp } from "firebase/firestore";
import { Image } from "./Image.types";

export type Schedule = {
  _id?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  images: Image[];
  uid: string;
};
