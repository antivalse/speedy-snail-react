/* Image Types */

export type Image = {
  userId?: string; // only exists in images uploaded by users
  url: string;
  title: string;
  category: string;
  isDefault: boolean;
};
