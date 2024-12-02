/* Custom hook to update an image in Firebase Storage and Image Collection */

import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { storage, imagesCollection } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
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
        console.log("storage ref is: ", storageRef);

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

  const deleteImage = async (id: string | undefined, imageUrl: string) => {
    if (!id) {
      setError("Document ID is undefined or invalid.");
      return;
    }

    try {
      // Delete Firestore document
      await deleteDoc(doc(imagesCollection, id));

      // Delete image from Firebase Storage
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Delete failed:", err.message);
        setError(
          `Something went wrong when trying to delete the image: ${err.message}`
        );
      }
    }
  };
  return {
    updateImage,
    deleteImage,
    isUpdating,
    error,
    setError,
  };
};

export default useUpdateImage;
