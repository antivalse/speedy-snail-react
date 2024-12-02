/* Custom hook to update an image in Firebase Storage and Image Collection */

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { storage, imagesCollection } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useAuth from "./useAuth";

const useUpdateImage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the uid
  const { user } = useAuth();

  const updateImage = async (
    id: string | undefined,
    file?: File,
    category?: string | null,
    title?: string | null
  ) => {
    setIsUpdating(true);
    setError(null);

    try {
      const updates: Record<string, string | null> = {};

      // Update file in storage if provided
      if (file) {
        const storageRef = ref(
          storage,
          `user_images/${user?.uid}/${file.name}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        updates.url = downloadURL; // Update the image URL in the database
      }

      // Update title if provided
      if (title) {
        updates.title = title;
      }

      // Update category if provided
      if (category) {
        updates.category = category;
      }
      // Update Firestore document if any updates exist
      if (Object.keys(updates).length > 0) {
        const imageRef = doc(imagesCollection, id);
        await updateDoc(imageRef, updates);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(
          `Something went wrong when trying to update image: ${err.message} `
        );
      }
    }
  };
  return {
    updateImage,
    isUpdating,
    error,
    setError,
  };
};

export default useUpdateImage;
