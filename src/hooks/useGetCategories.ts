/* Custom hook to get realtime categories collection data from Firebase */

import { categoriesCollection } from "../firebase/config";
import useSyncedCollection from "./useSyncedCollection";

const useGetCategories = () => {
  return useSyncedCollection(categoriesCollection);
};

export default useGetCategories;
