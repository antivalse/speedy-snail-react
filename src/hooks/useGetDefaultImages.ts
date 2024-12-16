/* Custom hook to get realtime default image collection data from Firebase */

import { defaultImagesCollection } from "../firebase/config";
import useSyncedCollection from "./useSyncedCollection";
import { orderBy } from "firebase/firestore";

const useGetDefaultImages = () => {
  const { data: defaultImages, loading: defaultLoading } = useSyncedCollection(
    defaultImagesCollection,
    orderBy("title")
  );

  return {
    defaultImages,
    defaultLoading,
  };
};

export default useGetDefaultImages;
