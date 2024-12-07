/* Schedule Types */

import { FieldValue, Timestamp } from "firebase/firestore";
import { Image } from "./Image.types";

export type Schedule = {
  _id?: string;
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  images: Image[] | [];
  uid: string | undefined;
};
