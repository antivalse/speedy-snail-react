/* Custom hook to get realtime image collection data from Firebase */

import { imagesCollection } from "../firebase/config";
import useAuth from "./useAuth";
// import useSyncedCollection from "./useSyncedCollection";
import { orderBy, where } from "firebase/firestore";
import useSyncedCollection from "./useSyncedCollection";

const useGetImages = () => {
  const { user } = useAuth();

  // Fetch user-specific images (userId == user.uid) only if the user is logged in
  const { data: userImages, loading: userLoading } = useSyncedCollection(
    imagesCollection,
    where("userId", "==", user?.uid),
    orderBy("title")
  );

  return {
    userImages,
    userLoading,
  };
};

export default useGetImages;
