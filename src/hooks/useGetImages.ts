/* Custom hook to get realtime image collection data from Firebase */

import { imagesCollection } from "../firebase/config";
import useAuth from "./useAuth";
import useSyncedCollection from "./useSyncedCollection";
import { limit, orderBy, startAfter, where } from "firebase/firestore";

const useGetImages = () => {
  const { user } = useAuth();

  const pageLimit = 3; // Number of items per page

  // Track the last visible image from the previous page
  const lastVisible = null;

  console.log("last visible is: ", lastVisible);

  // Fetch user-specific images (userId == user.uid) only if the user is logged in
  const { data: userImages, loading: userLoading } = useSyncedCollection(
    imagesCollection,
    where("userId", "==", user?.uid),
    orderBy("title"),
    limit(pageLimit),
    startAfter(lastVisible) // Use startAfter for pagination, passing the last visible document from the previous page
  );

  return {
    userImages,
    userLoading,
    lastVisible,
  };
};

export default useGetImages;
