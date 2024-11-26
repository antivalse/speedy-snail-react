/* Image Types */

export type Image = {
  _id?: string; // id is auto-generated when uploading image to Firebase
  userId?: string; // only exists in images uploaded by users
  url: string;
  title: string;
  category: string;
  isDefault: boolean;
};
