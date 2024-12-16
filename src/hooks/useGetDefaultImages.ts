/* Custom hook to get realtime default image collection data from Firebase */

import { defaultImagesCollection } from "../firebase/config";
import useSyncedCollection from "./useSyncedCollection";
import { limit, orderBy } from "firebase/firestore";

const useGetDefaultImages = () => {
  // Fetch user-specific images (userId == user.uid) only if the user is logged in
  const { data: defaultImages, loading: defaultLoading } = useSyncedCollection(
    defaultImagesCollection,
    orderBy("title"),
    limit(10)
  );

  return {
    defaultImages,
    defaultLoading,
  };
};

export default useGetDefaultImages;
