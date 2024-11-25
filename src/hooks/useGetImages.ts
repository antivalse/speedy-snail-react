/* Custom hook to get realtime image collection data from Firebase */

import { imagesCollection } from "../firebase/config";
import useSyncedCollection from "./useSyncedCollection";

const useGetImages = () => {
  return useSyncedCollection(imagesCollection);
};

export default useGetImages;
