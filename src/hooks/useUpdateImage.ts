/* Custom hook to update an image */

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { storage, imagesCollection } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Image } from "../types/Image.types";

const useUpdateImage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const updateImage = async (
    id: string | undefined,
    uid: string | undefined,
    file: File | null,
    category: string | null,
    title: string | null
  ) => {
    setIsUpdating(true);
    setError(null);

    // storage reference
    const storageRef = ref(storage, `user_images/${uid}}/${file?.name}`);
    // document reference
    const imageRef = doc(imagesCollection, id);

    // Upload the file to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, file);
    console.log("File uploaded successfully:", uploadResult);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(uploadResult.ref);
    setImageUrl(downloadURL); // Store the URL in state

    try {
      // Save the image metadata to Firestore
      const imageData: Image = {
        userId: uid,
        url: downloadURL,
        title: title || "",
        category: category || "",
        isDefault: false,
      };

      await updateDoc(imageRef, imageData);
    } catch (err) {
      if (err instanceof Error) {
        setError("Something went trong when updating image. Try again later");
      }
    }
  };
  return {
    updateImage,
    isUpdating,
    error,
  };
};

export default useUpdateImage;
