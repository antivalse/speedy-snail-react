/* Custom hook to get realtime image collection data from Firebase */

import { imagesCollection } from "../firebase/config";
import useAuth from "./useAuth";
import useSyncedCollection from "./useSyncedCollection";
import { limit, orderBy, where } from "firebase/firestore";

const useGetImages = () => {
  const { user } = useAuth();

  // Fetch user-specific images (userId == user.uid) only if the user is logged in
  const { data: userImages, loading: userLoading } = useSyncedCollection(
    imagesCollection,
    user ? where("userId", "==", user.uid) : where("userId", "==", ""),
    orderBy("title"),
    limit(10)
  );

  return {
    userImages,
    userLoading,
  };
};

export default useGetImages;
