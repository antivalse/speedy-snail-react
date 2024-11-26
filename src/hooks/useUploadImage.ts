/* Custom hook to upload new image to Firebase Storage and Image collection */

import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { storage, imagesCollection } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Image } from "../types/Image.types";

export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadImage = async (
    file: File,
    uid: string | undefined,
    category: string | null,
    title: string | null
  ) => {
    setIsUploading(true);
    setError(null);

    // Determine if the image is a default image based on file
    const isDefaultImage = file.name.startsWith("default"); //

    // Create a reference in Firebase Storage
    const storageRef = ref(
      storage,
      `${isDefaultImage ? "default_images" : `user_images/${uid}`}/${file.name}`
    );

    try {
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("File uploaded successfully:", uploadResult);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(uploadResult.ref);
      setImageUrl(downloadURL); // Store the URL in state

      // Save the image metadata to Firestore
      const imageData: Image = {
        userId: isDefaultImage ? "" : uid,
        url: downloadURL,
        title: title || "",
        category: category || "",
        isDefault: false,
      };

      await addDoc(imagesCollection, imageData);
      console.log("Image metadata saved to Firestore");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error uploading file: ", err);
        setError("Error uploading image, please try again.");
      }
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  return {
    isUploading,
    error,
    imageUrl,
    uploadImage,
  };
};
