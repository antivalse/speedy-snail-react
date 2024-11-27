/* Custom hook to get realtime image collection data from Firebase */

import { imagesCollection } from "../firebase/config";
import useAuth from "./useAuth";
import useSyncedCollection from "./useSyncedCollection";
import { where } from "firebase/firestore";

const useGetImages = () => {
  const { user } = useAuth();

  // Fetch default images (isDefault == true)
  const defaultImagesQuery = where("isDefault", "==", true);
  const { data: defaultImages, loading: defaultLoading } = useSyncedCollection(
    imagesCollection,
    defaultImagesQuery
  );

  // Fetch user-specific images (userId == user.uid) only if the user is logged in
  const { data: userImages, loading: userLoading } = useSyncedCollection(
    imagesCollection,
    user ? where("userId", "==", user.uid) : where("userId", "==", "")
  );

  // Combine both sets of images (default images + user images)
  const combinedData = [...(defaultImages || []), ...(userImages || [])];

  // Loading state: only set to true if either of the queries is still loading
  const loading = defaultLoading || userLoading;

  return {
    data: combinedData,
    loading,
  };
};

export default useGetImages;
